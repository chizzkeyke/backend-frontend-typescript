import { Schema, model } from 'mongoose'
import { MessageInterface } from './message.interface'

const MessageSchema = new Schema<MessageInterface>({
    id: { type: String, required: true, unique: true },
    chat_id: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    unread: { type: Boolean, required: true, default: false }
})

export const modelMessage = model('Message', MessageSchema)