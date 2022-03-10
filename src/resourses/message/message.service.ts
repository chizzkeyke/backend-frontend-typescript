import { nanoid } from "nanoid";
import { MessageInterface } from "./message.interface";
import { modelMessage } from "./message.model";

class MessageService {
    async createNewMessage(author: string, body: string, chat_id: string, save: boolean): Promise<MessageInterface> {
        try {
            const newMessage = await modelMessage.create({
                id: nanoid(),
                chat_id,
                author,
                body,
            })         
            
            if (save) {
                await newMessage.delete()
            }

            return newMessage
        } catch (error) {
            throw error
        }
    }

    async getOneMessage(idRoom: string, body: string, author: string): Promise<MessageInterface> {
        try {
            const findedMessage = await modelMessage.findOne({chat_id: idRoom, body, author}) 

            console.log(findedMessage);
            

            if (!findedMessage) {
                throw 'Message is not a find'
            }

            return findedMessage
        } catch (error) {
            throw error
        }
    }

    async getAllMessagesOfCurrentChat(chat_id: string): Promise<MessageInterface[]> {
        try {
            const messages = await modelMessage.find({chat_id})
            
            if (!messages) throw 'Messages is not a found.'

            return messages
        } catch (error) {
            throw error
        }
    }
}

export default new MessageService()