import express, {Express} from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import logger from './logger/logger.service'

import { routerPost } from './resourses/post/post.router'
import { routerUser } from './resourses/user/user.router'
import { routerRole } from './resourses/role/role.router'
import { routerComment } from './resourses/comment/comment.router'

const app = express()
const port: number = 8000
const mongoDbURL = 'mongodb://localhost:27017/backend-typescript' 

app.use(cors())
app.use(express.json())
app.use('/api', routerPost)
app.use('/api', routerUser)
app.use('/api', routerRole)
app.use('/api', routerComment)

const bootstrap = async (): Promise<void> => {
   try {
      await mongoose.connect(mongoDbURL)
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


class App {
   private port: number = 8000
   private urlDB: string = 'mongodb://localhost:27017/backend-typescript' 
   app: Express 
   
   constructor(middlewares: Object[]) {
      this.app = app
   }

   private initialRoutes() {
      
   }

   private initializeMiddleware(): void{
      this.app.use(express.json())
   }

   async connectToDatabase(): Promise<void> {
      await mongoose.connect(this.urlDB)
   }

   async bootstrap() {
      await this.connectToDatabase()
      this.app.listen(port, () => {
         logger.log(`Server start work on port ${this.port}`)
      })
   }  
}