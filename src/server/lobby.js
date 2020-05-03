import {v4 as uuid} from 'uuid'
import { ServerState } from './state'

const state = ServerState()

export const connect = (socket) => {
    state.registerSocket(socket)
    socket.join('lobby')
}

export const disconnect = (socket) => {
    const player = state.getPlayerBySocket(socket)
    if(player) {
        state.kick(player)
    }
    state.unregisterSocket(socket)
    socket.leaveAll()
}

export const getAllTables = (action, socket) => {
    socket.emit('action', {type:'refreshTables', tables:state.tables})
}

export const login = ({name}, socket) => {
    state.registerPlayer(name, socket)
    //socket.emit('error', 'That name already exists')
}

export const createTable = (action, socket) => {
    const player = state.getPlayerBySocket(socket)
    //socket.emit('error', 'You are not logged in')
    const tableId = state.createTable(player)
    //socket.emit('error', 'Could not create the table')
    socket.leave('lobby')
    socket.join(`table/${tableId}`)
    socket.emit('action', {type:'tableCreated', table:state.tables[tableId]}) // todo
    socket.to('lobby').emit('action', {type:'tableCreated', table:state.tables[tableId]})
}

export const joinTable = (action, socket) => {
    const player = state.getPlayerBySocket(socket)
    //socket.emit('error', 'You are not logged in')
    state.joinTable(player, action.id)
    //socket.emit('error', 'Could not join the table')
    socket.leave(`lobby`)
    socket.join(`table/${tables.length}`)
}