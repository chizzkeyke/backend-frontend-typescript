import { Router } from "express";
import chatController from "./chat.controller"; 
import { authMiddleware } from "../../middlewares/auth.middleware";

const routerChat = Router()

routerChat.use('/chats', authMiddleware)
routerChat.get('/chats', chatController.getChats)
routerChat.post('/chats', chatController.createChat)

export { routerChat }