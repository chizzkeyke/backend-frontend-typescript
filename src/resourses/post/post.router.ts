import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { postController } from './post.controller'

const routerPost = Router()

routerPost.use('/post', authMiddleware)
routerPost.get('/post', postController.getPosts)
routerPost.get('/post/:id', postController.getPost)
routerPost.get('/posts/:username', postController.getPostsAuthUser)
routerPost.post('/post', postController.createPost)
routerPost.put('/post', postController.putPost)
routerPost.delete('/post/:id', postController.deletePost)

export { routerPost }