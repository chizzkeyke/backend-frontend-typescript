import { Router } from 'express'

const routerPost = Router()

routerPost.get('/post')
routerPost.get('/post/:id')
routerPost.post('/post')
routerPost.put('/post')
routerPost.delete('/post/:id')

export { routerPost }