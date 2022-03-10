import { MessageInterface } from "../message/message.interface";

export interface ChatInterface {
    id: string
    author: string
    partner: string
    messages: Array<MessageInterface>
}