import { Request, Response } from 'express'
import { modelComment } from './comment.model'
import { modelPost } from '../post/post.model'
import { modelUser } from '../user/user.model'
import { nanoid } from 'nanoid'
import { createCommentSelectedPost, getCommentsSelectedPost, updateCommentSelectedPost, deleteSelectedComment } from './comment.service'

export class CommentController {
   async getComments(req: Request, res: Response) {
      try {
         const { idPost } = req.params

         const commentsPost = await getCommentsSelectedPost(idPost)

         return res.status(200).json({
            data: commentsPost
         })

      } catch (e) {
         return res.status(400).json({
            message: 'Error create comment.'
         })
      }
   }

   async postComment(req: Request, res: Response) {
      try {
         const { idPost } = req.params
         const { body, author } = req.body

         const newComment = await createCommentSelectedPost(idPost, author, body)

         return res.status(200).json({
            data: newComment
         })

      } catch (e) {
         return res.status(500).json({
            message: 'Error create comment.'
         })
      }
   }

   async putComment(req: Request, res: Response) {
      try {
         const { idPost } = req.params
         const { author, body, idComment } = req.body

         const updatePost = await updateCommentSelectedPost(idPost, idComment, author, body)

         return res.status(200).json({
            data: updatePost
         })

      } catch (error) {
         return res.status(500).json({
            error
         })
      }
   }

   async deleteComment(req: Request, res: Response) {
      try {
         const { idComment } = req.params
         const token = req.headers.authorization?.split(' ')[1]

         if (!token) throw 'Token is not a find.'

         const result = await deleteSelectedComment(token, idComment)

         res.status(200).json({
            data: result
         })

      } catch (error) {
         return res.status(500).json({
            error
         })
      }
   }
}

export default new CommentController()