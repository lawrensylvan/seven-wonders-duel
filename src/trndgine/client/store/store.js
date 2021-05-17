import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import socketIO from 'socket.io-client'
import createSocketIOMiddleware from 'redux-socket.io'

import reducers from './reducers'

const io = socketIO('http://' + serverHost + ':' + serverPort)

io.on('server error', (error) => alert(`Got error from server : ${error}`))

const store = createStore(
    combineReducers(reducers),
    composeWithDevTools(
        applyMiddleware(
            createSocketIOMiddleware(io, 'server/') // actions beginning with 'server/' will be sent to server as 'action' messages
            )
        )
)

export default store