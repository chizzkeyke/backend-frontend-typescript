import { Router } from 'express'
import userController from '../user/user.contoller'
import { validationMiddlewareCreateUser } from '../../middlewares/validationMiddleware'

const routerUser = Router()

routerUser.use('/register' || '/login', validationMiddlewareCreateUser)
routerUser.post('/login', userController.login)
routerUser.post('/register', userController.register)
routerUser.get('/self')

export { routerUser }