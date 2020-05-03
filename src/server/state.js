import { State as GameState } from '../core/state'

export const ServerState = () => ({

    sockets: [],
    players: [],
    playersBySocket: {},
    tables: [],

    registerSocket(socket) {
        if(this.sockets.includes(socket)) throw 'This socket is already registered'
        this.sockets.push(socket)
    },

    unregisterSocket(socket) {
        if(!this.sockets.includes(socket)) throw 'This socket is not registered'
        this.sockets.splice(this.sockets.indexOf(socket), 1)
    },

    registerPlayer(player, socket) {
        if(this.players.includes(player)) throw 'This player name already exists'
        if(!this.sockets.includes(socket)) throw 'Cannot register player for unregistered socket'
        this.players.push(player)
        this.playersBySocket[socket] = player
    },

    getPlayerBySocket(socket) {
        return this.playersBySocket[socket]
    },

    kick(player) {
        this.tables.forEach(t => t.kick(player))
    },

    createTable(creator) {
        if(!this.players.includes(creator)) throw 'This player does not exist'
        const id = this.tables.length
        const table = Table(this.tables.length, creator)
        this.tables.push(table)
        return id
    },

    joinTable(player, tableId) {
        if(!this.players.includes(creator)) throw 'This player does not exist'
        if(tableId >= tables.length) throw 'This table does not exist'
        const table = this.tables[tableId]
        table.addPlayer(player)
    }
})

const Table = (id, creator) => ({
    id: id,
    creator: creator,
    players: [creator],
    status: 'WAITING_FOR_PLAYERS',
    state: null, // todo

    addPlayer(player) {
        if(this.players.includes(player)) throw 'You are already in this table'
        if(this.isFull()) throw 'This table is full'
        if(!this.isFreeToJoin()) throw 'This table is not free to join'

        this.players.push(player)
        //if(!this.creator) this.creator = player
        if(this.players.length === 2) {
            this.table.status = 'READY_TO_PLAY'
        }
    },

    kick(player) {
        this.players.splice(this.players.indexOf(player), 1)
    },

    hasEnoughPlayer() {
        return this.players.length === 2
    },

    isFull() {
        return this.players.length === 2
    },

    isFreeToJoin() {
        !this.isFull && this.status === 'WAITING_FOR_PLAYERS'
    },

    start() {
        this.state = GameState()
        this.status = 'IN_PROGRESS'
        // TODO
    }

})
