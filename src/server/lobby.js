import {v4 as uuid} from 'uuid'
import { ServerState } from './state'

const state = ServerState()

export const connect = (socket) => {
    state.registerSocket(socket.id)
    socket.join('lobby')
}

export const disconnect = (socket) => {
    const player = state.getPlayerBySocket(socket.id)
    if(player) {
        state.kick(player)
    }
    state.unregisterSocket(socket.id)
    socket.leaveAll()
}

export const getAllTables = (action, socket) => {
    socket.emit('action', {type:'refreshTables', tables:state.tables})
}

export const login = ({name}, socket) => {
    state.registerPlayer(name, socket.id)
    socket.emit('action', {type:'loggedIn', name:name}) // todo
}

export const createTable = (action, socket) => {
    const player = state.getPlayerBySocket(socket.id)
    const tableId = state.createTable(player)
    //socket.leave('lobby')
    socket.join(`table/${tableId}`)
    socket.emit('action', {type:'tableCreated', table:state.tables[tableId]}) // todo
    socket.to('lobby').emit('action', {type:'tableCreated', table:state.tables[tableId]})
}

export const joinTable = ({tableId}, socket) => {
    const player = state.getPlayerBySocket(socket.id)
    state.joinTable(player, tableId)
    //socket.leave(`lobby`)
    socket.join(`table/${tableId}`)
    socket.emit('action', {type:'tableUpdated', table:state.tables[tableId]}) // todo
    socket.to('lobby').emit('action', {type:'tableUpdated', table:state.tables[tableId]})
}

export const readyToPlay = ({tableId}, socket) => {
    const player = state.getPlayerBySocket(socket.id)
    state.playerIsReady(player, tableId)
    socket.emit('action', {type:'tableUpdated', table:state.tables[tableId]}) // todo
    socket.to('lobby').emit('action', {type:'tableUpdated', table:state.tables[tableId]})
    if(state.tables[tableId].status === 'READY_TO_START') {
        state.tables[tableId].start()
        socket.emit('action', {type:'gameStarted', tableId}) // todo
        socket.to(`table/${tableId}`).emit('action', {type:'gameStarted', tableId})
    }
}