import { Schema, model } from 'mongoose'
import { ChatInterface } from './chat.interface'

const ChatSchema = new Schema<ChatInterface>({
    id: {type: String, required: true, unique: true},
    author: {type: String, required: true, ref: 'User'},
    partner: {type: String, required: true, ref: 'User'},
    messages: {type: [], required: true, default: [] }
})

export const ChatModel = model('Chat', ChatSchema)