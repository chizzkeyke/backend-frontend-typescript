import { nanoid } from 'nanoid'
import { MessageInterface } from '../message/message.interface'
import { ChatInterface } from './chat.interface'
import { ChatModel } from './chat.model'

class ChatService {
    async createNewChat(author: string, partner: string): Promise<ChatInterface> {
        try {
            const newId = nanoid()
            const newChat = await ChatModel.create({
                id: newId,
                author,
                partner
            })
    
            return newChat
        } catch (error) {
            throw error
        }
    }

    async addMessageInChat(message: MessageInterface, idChat: string): Promise<void> {
        try {
            const chat = await ChatModel.findOne({id: idChat})
            
            if (!chat) throw 'Chat is not a find.'

            chat.messages.push(message)

            await chat.save()

        } catch (error) {
            throw error
        }
    }

    async findChat(roomID: string): Promise<ChatInterface> {
        try {
            const findedRoom = await ChatModel.findOne({id: roomID})

            if (!findedRoom) throw 'Room is not a find.'

            return findedRoom
        } catch (error) {
            throw error
        }
    }

    async findChats(username: string): Promise<ChatInterface[]> {
        try {
            let findedChats = await ChatModel.find({author: username})

            if (!findedChats) throw 'Chats is not a find.'
            
            if (findedChats.length === 0) {
                findedChats = await ChatModel.find({partner: username})
            }

            return findedChats
        } catch (error) {
            throw error
        }
    }
}

export default new ChatService()