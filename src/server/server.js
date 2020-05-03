import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser'

import {connect, disconnect, createTable, joinTable, getAllTables, login } from './lobby'

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

// Setting up Socket.io server
const io = socketIO(server)

io.on('connect', (socket) => {
    console.info(`Socket $${socket.id} connected`)
    connect(socket)
    socket.on('disconnect', () => {
        console.info(`Socket $${socket.id} disconnected`)
        disconnect(socket)
    })

    // Listening to redux actions from clients
    socket.on('action', action => {
        console.info(`Socket $${socket.id} sent action ${action.type}`)
        switch (action.type) {
            case 'server/login':        login(action, socket);          break
            case 'server/createTable':  createTable(action, socket);    break
            case 'server/joinTable':    joinTable(action, socket);      break
            case 'server/getAllTables': getAllTables(action, socket);   break
            default: break;
        }
    })

})
