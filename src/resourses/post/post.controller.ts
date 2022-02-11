import { Request, Response } from 'express'
import { modelUser } from '../user/user.model'
import { modelPost } from './post.model'
import { nanoid } from 'nanoid'

class PostController {
   getPosts = async (req: Request, res: Response) => {
      try {
         const posts = await modelPost.find()
         const reversePost = posts.reverse()
         const data = []

         for (let i = 0; i <= 9; i++) {
            data.push(reversePost[i])
         }

         return res.status(200).json({
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
         const foundPost = await modelPost.findOne({id: idPost})

         if (!foundPost) {
            return res.status(400).json({
               message: 'Post is not find.'
            })
         }

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
         const user = await modelUser.findOne({token})

         if (!user) {
            return res.status(400).json({
               message: 'User is not find.'
            })
         }

         const {title, body} = req.body

         const createdPost = await modelPost.create({
            id: nanoid(),
            title,
            body,
            author: user.username
         })

         await createdPost.save()
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