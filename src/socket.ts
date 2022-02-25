import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
export const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:7000',
        credentials: true,
    }
})

const socket = ({io}: {io: Server}) => {
    io.on('connection', socket => {
    })
}
