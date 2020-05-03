import socketIO from 'socket.io-client'

const io = socketIO('http://localhost:7777')

export default io