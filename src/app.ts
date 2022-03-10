import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import logger from './logger/logger.service'
import { Server } from 'socket.io'
import http from 'http'

import { routerPost } from './resourses/post/post.router'
import { routerUser } from './resourses/user/user.router'
import { routerRole } from './resourses/role/role.router'
import { routerComment } from './resourses/comment/comment.router'
import { routerChat } from './resourses/chat/chat.router'
import { routerMessage } from './resourses/message/message.router'
import { ioControllerChat } from './socket'

const app = express()
const port: number = 8000
const mongoDbURL = 'mongodb://localhost:27017/backend-typescript'
const serverHTTP = http.createServer(app)
const io = new Server(serverHTTP, {
   cors: {
      origin: 'http://localhost:8000',
      methods: ['GET', 'POST']
   },
   transports: ['websocket']
})

app.use(cors())
app.use(express.json())
app.use('/api', routerPost)
app.use('/api', routerUser)
app.use('/api', routerRole)
app.use('/api', routerComment)
app.use('/api', routerChat)
app.use('/api', routerMessage)
ioControllerChat(io)

const bootstrap = async (): Promise<void> => {
   try {
      await mongoose.connect(mongoDbURL)
      serverHTTP.listen(port, () => {
         logger.log(`Server start work on port ${port}`)
      })
   } catch (error) {
      logger.error(`Server error.`)
   }
}

bootstrap()
   .catch(err => logger.error(err))
