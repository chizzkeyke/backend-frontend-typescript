import { Request, Response } from 'express'
import { modelComment } from './comment.model'
import { modelPost } from '../post/post.model'
import { modelUser } from '../user/user.model'
import { nanoid } from 'nanoid'

export class CommentController {
   async getCommentsSelectedPost(req: Request, res: Response) {
      try {
         const {idPost} = req.params

      } catch (e) {

      }
   }

   async postCommentSelectedPost(req: Request, res: Response) {
      try {
         const {idPost, body, author} = req.body
         const selectPost = await modelPost.findOne({id: idPost})
         const senderName = await modelUser.findOne({username: author})

         if (!selectPost) {
            return res.status(400).json({
               error: 'Post is not a find.'
            })
         }

         if (!senderName) {
            return res.status(400).json({
               error: 'Author is undefined.'
            })
         }

         const newComment = await modelComment.create({
            id: nanoid(),
            idPost,
            author,
            body,
            date_created: Date.now()
         })

         await newComment.save()

         return res.status(200).json({
            data: newComment
         })
      } catch (e) {
         console.log(e)
         return res.status(400).json({
            message: 'Error create comment.'
         })
      }
   }
}

export default new CommentController()