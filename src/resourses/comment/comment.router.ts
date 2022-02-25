import { Router } from 'express'
import commentController from './comment.contoller'
import { authMiddleware } from '../../middlewares/auth.middleware'

const routerComment = Router()

routerComment.use('/comment', authMiddleware)
routerComment.get('/comment/:idPost', commentController.getComments)
routerComment.post('/comment/:idPost', commentController.postComment)
routerComment.put('/comment/:idPost', commentController.putComment)
routerComment.delete('/comment/:idComment', commentController.deleteComment)

export { routerComment }