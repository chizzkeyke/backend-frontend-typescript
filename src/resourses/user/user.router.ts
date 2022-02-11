import { Router } from 'express'
import userController from '../user/user.contoller'
import {authMiddleware} from '../../middlewares/auth.middleware'

const routerUser = Router()

routerUser.use('/self', authMiddleware)
routerUser.post('/login', userController.login)
routerUser.post('/register', userController.register)
routerUser.get('/self', userController.getDataAboutAuthUser)

export { routerUser }