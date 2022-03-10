import { Router } from "express"
import messageController from "./message.controller"

const routerMessage = Router()

routerMessage.post('/message', messageController.postMessage)
routerMessage.get('/messages/:id', messageController.getMessages)


export {routerMessage}