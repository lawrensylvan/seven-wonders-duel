import { Game } from '../core/game'

export const ServerState = () => {

    // Private server state
    const sockets = []
    const players = []
    const playersBySocket = {}
    const tables = []
    const games = []

    // Set of functions that alter server state
    return {
        
        registerSocket(socket) {
            if(sockets.includes(socket)) throw 'This socket is already registered'
            sockets.push(socket)
        },

        unregisterSocket(socket) {
            if(!sockets.includes(socket)) throw 'This socket is not registered'
            sockets.splice(sockets.indexOf(socket), 1)
        },

        registerPlayer(player, socket) {
            if(!sockets.includes(socket)) throw 'Cannot register player for unregistered socket'
            if(!players.includes(player)) {
                players.push(player)
            }
            playersBySocket[socket] = player
        },

        getTables() {
            return tables
        },

        getTable(id) {
            //if(id >= tables.length) throw 'This table does not exist'
            return tables[id]
        },

        getPlayerBySocket(socket) {
            const player = playersBySocket[socket]
            if(!player) throw 'This socket is not registered'
            return playersBySocket[socket]
        },

        kick(player) {
            tables.forEach(t => t.kick(player))
        },

        checkPlayerExists(player) {
            if(!players.includes(player)) throw 'This player does not exist'
        },

        createTable(creator) {
            this.checkPlayerExists(creator)
            const id = tables.length
            const table = Table(tables.length, creator)
            tables.push(table)
            return id
        },

        joinTable(player, id) {
            console.log('id' + id)
            this.checkPlayerExists(player)
            const table = this.getTable(id)
            table.addPlayer(player)
        },

        playerIsReady(player, tableId) {
            this.checkPlayerExists(player)
            const table = this.getTable(tableId)
            table.playerIsReady(player)
        },

        getPlayers(tableId) {
            const table = this.getTable(tableId)
            return table.players
        },

        startGame(tableId) {
            const table = this.getTable(tableId)
            games[tableId] = Game(this.getPlayers(tableId))
            table.start()
        },

        getGameState4(player, tableId) {
            this.checkPlayerExists(player)
            const table = this.getTable(tableId)
            if(!table.players.includes(player)) throw 'This player is not in this game'
            if(!table.hasStarted()) throw 'The game has not started yet'
            const game = games[tableId]
            return game.getGameState4(player)
        },

        getMoveProcessor(tableId, player, move) {
            this.checkPlayerExists(player)
            const table = this.getTable(tableId)
            if(!table.players.includes(player)) throw 'This player is not in this game'
            if(!table.hasStarted()) throw 'The game has not started yet'
            if(table.isOver()) throw 'The game is over'
            const game = games[tableId]
            const processor = game.getMoveProcessor(player, move)
            return processor
        },

        getEventProcessor(tableId, event) {
            const table = this.getTable(tableId)
            if(!table.hasStarted()) throw 'The game has not started yet'
            if(table.isOver()) throw 'The game is over'
            const game = games[tableId]
            const processor = game.getEventProcessor(event)
            return processor
        }

        /*getGameState(tableId) {
            const table = getTable(tableId)
            if(!table.hasStarted()) throw 'The game has not started yet'
            const game = games[tableId]
            return game.getGameState()
        },*/

    }
}


const Table = (id, creator) => ({
    id: id,
    creator: creator,
    players: [creator],
    playersReady: [],
    status: 'WAITING_FOR_MORE_PLAYERS',

    hasEnoughPlayer() {
        return this.players.length === 2
    },

    isFull() {
        return this.players.length === 2
    },

    isFreeToJoin() {
        return this.status === 'WAITING_FOR_MORE_PLAYERS' && !this.isFull()
    },

    addPlayer(player) {
        if(this.players.includes(player)) throw 'You are already in this table'
        if(this.isFull()) throw 'This table is full'
        if(!this.isFreeToJoin()) throw 'This table is not free to join'

        this.players.push(player)
        //if(!creator) creator = player
        if(this.players.length === 2) {
            this.status = 'WAITING_FOR_PLAYERS_READY'
        }
    },

    playerIsReady(player) {
        if(this.status !== 'WAITING_FOR_PLAYERS_READY') throw 'Not a time to be ready'
        if(this.playersReady.includes(player)) throw 'The player is already ready'
        this.playersReady.push(player)
        if(this.playersReady.length === this.players.length) {
            this.status = 'READY_TO_START'
        }
    },

    kick(player) {
        this.players.splice(players.indexOf(player), 1)
    },

    start() {
        this.status = 'IN_PROGRESS'
    },

    hasStarted() {
        return ![
            'WAITING_FOR_PLAYERS_READY',
            'WAITING_FOR_MORE_PLAYERS'
        ].includes(this.status)
    },

    isOver() {
        return this.status === 'FINISHED'
    }

})
