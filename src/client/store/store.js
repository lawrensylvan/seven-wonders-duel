import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import socketIO from 'socket.io-client'
import createSocketIOMiddleware from 'redux-socket.io'

import reducers from './reducers'

const io = socketIO('http://localhost:7777')

const store = createStore(
    combineReducers(reducers),
    composeWithDevTools(
        applyMiddleware(
            createSocketIOMiddleware(io, 'server/')
        )
    )
)

export default store