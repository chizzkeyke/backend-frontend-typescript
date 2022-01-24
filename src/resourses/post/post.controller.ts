import { Request, Response } from 'express'
import { modelPost } from './post.model'

class PostController {
   getPosts = async (req: Request, res: Response) => {
      try {
         const {title, body, author} = req.body
         const post = await modelPost.create({
            title,
            body,
            author
         })
      } catch (e) {
         res.status(500).json({
            message: 'Ошибка сервера'
         })

      }
   }

   getPost = async (req: Request, res: Response) => {
      try {

      } catch (e) {

      }
   }

   createPost = async (req: Request, res: Response) => {
      try {

      } catch (e) {

      }
   }

   putPost = async (req: Request, res: Response) => {
      try {

      } catch (e) {

      }
   }

   deletePost = async (req: Request, res: Response) => {
      try {

      } catch (e) {

      }
   }
}

export const postController = new PostController()