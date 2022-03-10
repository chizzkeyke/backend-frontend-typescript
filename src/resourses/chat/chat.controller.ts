import { Request, Response } from "express";
import { modelUser } from "../user/user.model";
import chatService from "./chat.service";

class ContollerChat {
    async getChats(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            const findedUser = await modelUser.findOne({token})
            
            if (!findedUser) throw 'User is not a find.'

            const findedChats = await chatService.findChats(findedUser.username)

            return res.status(200).json({
                data: findedChats
            })

        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    async createChat(req: Request, res: Response) {
        try {
            const {author, partner} = req.body
            await chatService.createNewChat(author, partner)
            
            return res.status(200).json('Чат создан')

        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
}

export default new ContollerChat()