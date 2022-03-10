import { Server, Socket } from 'socket.io'
import ChatService from './resourses/chat/chat.service'
import MessageService from './resourses/message/message.service'

export function ioControllerChat(io: Server) {
    io.on('connection', (socket: Socket) => {
        socket.on('ROOM:CREATE', async ({ author, partner }: { author: string, partner: string }) => {
            const newChat = await ChatService.createNewChat(author, partner)
            socket.to(newChat.id).emit(`Chat №${newChat.id} was created.`)
        })

        socket.on('ROOM:ENTER', ({roomId, username}) => {
            socket.join(roomId)
            console.log(`${username} enter in room ${roomId}`)
        })
        
        socket.on('MESSAGE:SEND', async ({ idRoom, messageBody, author }: {idRoom: string, messageBody: string, author: string}) => {
            const newMessage = await MessageService.createNewMessage(author, messageBody, idRoom, true)
            socket.broadcast.to(idRoom).emit('MESSAGE:RECEIVED', newMessage)
        })

        socket.on('MESSAGE:WRITING', ({roomId}) => {
            socket.broadcast.to(roomId).emit('MESSAGE:WRITING', 'User writing message')
        })
    })
}
