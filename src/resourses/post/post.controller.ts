import { Request, Response } from 'express'
import { modelUser } from '../user/user.model'
import { modelPost } from './post.model'
import { getNewPosts, getOnePost, createPost, updatePost, deletePost, getPostsAuthUser } from './post.service'


class PostController {
   getPosts = async (req: Request, res: Response) => {
      try {
         const data = await getNewPosts()

         res.status(200).json({
            data
         })

      } catch (e) {
         res.status(500).json({
            message: 'Ошибка сервера'
         })
      }
   }

   getPost = async (req: Request, res: Response) => {
      try {
         const idPost = req.params.id
         const foundPost = await getOnePost(idPost)

         return res.status(200).json({
            data: foundPost
         })

      } catch (e) {
         return res.status(500).json({
            error: 'Error on server.'
         })
      }
   }

   createPost = async (req: Request, res: Response) => {
      try {
         const token = req.headers.authorization?.split(' ')[1]
         const { title, body } = req.body

         if (!token) {
            return res.status(400).json({
               error: 'User is not undefined.'
            })
         }

         const createdPost = createPost(title, body, token)

         return res.status(201).json({
            data: createdPost
         })

      } catch (e) {
         return res.status(500).json({
            message: 'Error server'
         })
      }
   }

   putPost = async (req: Request, res: Response) => {
      try {
         const { idPost, body, title } = req.body
         const token = req.headers.authorization?.split(' ')[1]         

         if (!token) {
            throw res.status(400).json({
               error: 'Токен гавно'
            })
         }

         const updatingPost = await updatePost(idPost, body, title, token)

         return res.status(200).json({
            data: updatingPost
         })
      } catch (e) {
         return res.status(500).json({
            error: e
         })
      }
   }

   deletePost = async (req: Request, res: Response) => {
      try {
         const token = req.headers.authorization?.split(' ')[1]
         const idPost = req.params.id

         if (!idPost) {
            throw 'Id post is not a find.'
         }

         if (!token) {
            throw 'Token is shit'
         }

         const succesfullMessageDelete = await deletePost(idPost, token)

         return res.status(200).json({
            message: succesfullMessageDelete
         })

      } catch (e) {
         return res.status(500).json({
            error: 'Error on server.'
         })
      }
   }

   getPostsAuthUser = async (req: Request, res: Response) => {
      try {
         const token = req.headers.authorization?.split(' ')[1]

         if (!token) {
            throw 'Токен фуфло'
         }

         const posts = await getPostsAuthUser(token)
         return res.status(200).json({
            data: posts
         })

      } catch (e) {
         return res.status(500).json({
            message: e
         })
      }
   }
}

export const postController = new PostController()