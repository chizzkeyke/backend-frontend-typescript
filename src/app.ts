import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import logger from './logger/logger.service'

import { routerPost } from './resourses/post/post.router'
import { routerUser } from './resourses/user/user.router'

const app = express()
const port: number = 8000
const urlDatabase: string = "mongodb+srv://romeo:1223@cluster0.tnknp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())
app.use('/api', routerPost)
app.use('/api/user', routerUser)

app.get('/', (req: Request, res: Response) => {
   logger.log('Запрос на путь "/"')
   res.status(200).json({
      message: 'Удачно всё получилось.'
   })
})

const bootstrap = async (): Promise<void> => {
   try {
      await mongoose.connect(urlDatabase)
      app.listen(port, () => {
         logger.log(`Server start work on port ${port}`)
      })
   } catch (error) {
      logger.error(`Server error.`)
   }
}

bootstrap().then(() => {
   logger.log('Server work and successful connect to database.')
})