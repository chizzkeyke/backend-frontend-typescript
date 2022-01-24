import { Request, Response } from 'express'
import { modelUser } from './user.model'
import { hashPassword } from '../../utils/hashPassword'
import logger from '../../logger/logger.service'

class userController {
   async register(req: Request, res: Response) {
      try {
         const {username, email, password, confirmPassword} = req.body
         const candidate = await modelUser.findOne({username})

         if (password !== confirmPassword) {
            return res.status(400).json({
               message: 'Password and confirm password don\'t is identical.'
            })
         }

         if (candidate) {
            return res.status(400).json({
               message: 'User with this username is '
            })
         }

         const newHashPassword = hashPassword(password)

         const newUser = await modelUser.create({username, email, newHashPassword})
         await newUser.save()

         return res.status(200).json({
            message: 'New user was created.'
         })

      } catch (e) {
         logger.error('Error register user.')
         res.status(500).json({
            message: 'Error server in register new user.'
         })
      }

   }

   login() {

   }

   getDataAboutAuthUser() {

   }
}