import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser'
import {v4 as uuid} from 'uuid'

// Initializing Express server
const app = express()
app.use(
    cors(),                                 // very laxe security
    bodyParser.urlencoded({extended:true}), // |
    bodyParser.json()                        // - allow to use POST requests 
)

// Listening on port
const PORT = process.env.PORT || 7777
const server = http.createServer(app)
server.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`)
})

// Serving a GET route
app.get('/', (req, res) => {
    console.info('GET requested')
    res.status(200).send('<h1>Welcome to the server</h1>')
})

// Setting up a Socket.io
const io = socketIO(server)

const tables = []
const players = []

io.on('connect', (socket) => {

    /**** Connect ****/

    console.info(`Socket $${socket.id}: connected`)
    socket.join('lobby')

    /**** Create and join a new table ****/

    socket.on('createTable', ({name}, callback) => {
        // verify player name is unique
        if(players.find(p=>p.name===name)) {
            callback('error', `That name already exists`)
            return
        }
        // register player
        const player = {id: socket.id, name}
        players.push(player)
        // create a table with the player
        const table = {
            id: tables.length,
            creator: player,
            players: [player],
            status: 'WAITING_FOR_PLAYERS'
        }
        socket.leave(`lobby`)
        socket.join(`table/${table.id}`)
        tables.push(table)
        console.info(`${name} created a table`)
        // confirm table creation
        callback('success', table.id)
        // notify table creation to other players
        io.to('lobby').emit('tableCreated', table)
    })

    /**** Join a pending table ****/

    socket.on('joinTable', ({name, id}, reject) => {
        // verify name is unique
        if(players.find(p=>p.name===name)) {
            reject(`That name already exists`)
            return
        }
        // register player
        const player = {id: socket.id, name}
        players.push(player)
        // verify table exists
        if(id < 0 || id >= tables.length) {
            reject(`That table does not exist`)
            return
        }
        // verify table is not full
        const table = tables[id]
        if(table.players.length === 2) {
            reject(`That table is full`)
            return
        }
        // add player to the table
        table.players.push(player)
        table.status = 'READY_TO_PLAY'
        socket.leave(`lobby`)
        socket.join(`table/${tables.length}`)

        console.info(`${name} joined table ${id}`)
    })

    // Disconnect
    socket.on('disconnect', () => {
        const player = players.find(p => p.id === socket.id)
        if(player !== undefined) {
            console.info(`Player ${player.name} left`)
            players.splice(players.indexOf(player), 1)
        }
        socket.leaveAll()
        console.info(`Socket ${socket.id} disconnected`)
    })
})
