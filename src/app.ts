import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import logger from './logger/logger.service'

import { routerPost } from './resourses/post/post.router'
import { routerUser } from './resourses/user/user.router'


const app = express()
const port: number = 8000
const urlDB: string = 'mongodb+srv://romeo:minigun9876@cluster0.xyeha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())
app.use('/api', routerPost)
app.use('/api', routerUser)

app.get('/', (req: Request, res: Response) => {
   logger.log('Запрос на путь "/"')
   res.status(200).json({
      message: 'Удачно всё получилось.'
   })
})

const bootstrap = async (): Promise<void> => {
   try {
      await mongoose.connect(urlDB)
      app.listen(port, () => {
         logger.log(`Server start work on port ${port}`)
      })
   } catch (error) {
      logger.error(`Server error.`)
   }
}

bootstrap()
   .then(() => {
      logger.log('connected to db is successful')
   })
   .catch(() => {
      logger.log('Server not work.')
   })