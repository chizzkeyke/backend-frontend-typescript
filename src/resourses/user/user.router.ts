import { Router } from 'express'

const routerUser = Router()

routerUser.post('/login')
routerUser.post('/register')
routerUser.get('/self')

export { routerUser }