import { Router } from 'express'
import commentController from './comment.contoller'
import { authMiddleware } from '../../middlewares/auth.middleware'

const routerComment = Router()

routerComment.use('/comment', authMiddleware)
routerComment.get('/comment/:idPost', commentController.getCommentsSelectedPost)
routerComment.post('/comment/:idPost', commentController.postCommentSelectedPost)

export { routerComment }