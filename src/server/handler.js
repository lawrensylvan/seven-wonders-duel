import {v4 as uuid} from 'uuid'
import { ServerState } from './state'

const state = ServerState()

const handler = {
    
    connect: (socket) => {
        state.registerSocket(socket.id)
        socket.join('lobby')
    },

    disconnect: (socket) => {
        /*const player = state.getPlayerBySocket(socket.id)
        if(player) {
            state.kick(player)
        }*/
        state.unregisterSocket(socket.id)
        socket.leaveAll()
    },

    login: ({name}, socket) => {
        state.registerPlayer(name, socket.id)
        socket.join(name)
        socket.emit('action', {type:'loggedIn', name:name})
    },

    getAllTables: (action, socket) => {
        socket.emit('action', {type:'refreshTables', tables:state.tables})
    },

    createTable: (action, socket) => {
        const player = state.getPlayerBySocket(socket.id)
        const tableId = state.createTable(player)
        //socket.leave('lobby')
        socket.join(`table/${tableId}`)
        socket.emit('action', {type:'tableCreated', table:state.tables[tableId]}) // todo
        socket.to('lobby').emit('action', {type:'tableCreated', table:state.tables[tableId]})
    },

    joinTable: ({tableId}, socket) => {
        const player = state.getPlayerBySocket(socket.id)
        state.joinTable(player, tableId)
        //socket.leave(`lobby`)
        socket.join(`table/${tableId}`)
        socket.emit('action', {type:'tableUpdated', table:state.tables[tableId]}) // todo
        socket.to('lobby').emit('action', {type:'tableUpdated', table:state.tables[tableId]})
    },

    readyToPlay: ({tableId}, socket) => {
        const player = state.getPlayerBySocket(socket.id)
        state.playerIsReady(player, tableId)
        socket.emit('action', {type:'tableUpdated', table:state.tables[tableId]}) // todo
        socket.to('lobby').emit('action', {type:'tableUpdated', table:state.tables[tableId]})
        if(state.tables[tableId].status === 'READY_TO_START') {
            state.startGame(tableId)
            socket.emit('action', {type:'gameStarted', tableId})
            socket.to(`table/${tableId}`).emit('action', {type:'gameStarted', tableId})
        }
    },

    getGameState: ({tableId}, socket) => {
        console.log('Client requested to play')
        const player = state.getPlayerBySocket(socket.id)
        const gameState = state.getPublicGameState4(player, tableId)
        socket.emit('action', {type:'refreshGameState', tableId, state:gameState})
    },

    move: ({tableId, move}, socket) => {
        console.log('Client requested to play')
        const player = state.getPlayerBySocket(socket.id)
        state.processMove(tableId, player, move)
        
        state.getPlayers(tableId).forEach(p => {
            const step = state.getLastGameStep4(p, tableId)
            socket.to(p).emit('action', {type:'gameStepPushed', tableId, step})
            if(p === player) {
                socket.emit('action', {type:'gameStepPushed', tableId, step})
            }
        })
    },

    resign: ({tableId}, socket) => {
        console.log('Client requested to resign')
        const player = state.getPlayerBySocket(socket.id)
        // todo
    }

}

export default handler