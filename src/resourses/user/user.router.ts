import { Router } from 'express'
import userController from '../user/user.contoller'
import {authMiddleware} from '../../middlewares/auth.middleware'

const routerUser = Router()

routerUser.use('/self' || '/users', authMiddleware)
routerUser.post('/login', userController.login)
routerUser.post('/register', userController.register)
routerUser.get('/self', userController.getDataAboutAuthUser)
routerUser.get('/users', userController.getAllUsers)

export { routerUser }