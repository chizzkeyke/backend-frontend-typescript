import { Request, Response } from "express";
import messageService from "./message.service";

class MessageContoller {
    async postMessage(req: Request, res: Response) {
        try {
            const { idRoom, messageBody, author } = req.body

            const newMessage = await messageService.createNewMessage(author, messageBody, idRoom, false)

            return res.status(200).json({
                data: newMessage
            })

        } catch (error) {
            return res.status(500).json({
                error: 'Server Error'
            })
        }
    }

    async getMessages(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!id) throw 'Id not get'

            const messages = await (await messageService.getAllMessagesOfCurrentChat(id)).reverse()

            return res.status(200).json({
                data: messages
            })
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }
}

export default new MessageContoller()