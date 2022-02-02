import { Request, Response } from 'express'
import { modelUser } from './user.model'
import { modelRole } from '../role/role.model'
import { hashPassword } from '../../utils/hashPassword'
import logger from '../../logger/logger.service'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

function getJWT(email: string, secret: string, role: string) {
   const payload = {
      email, role
   }

   return sign(payload, secret)
}

class userController {
   async register(req: Request, res: Response) {
      try {
         const {username, email, password} = req.body
         const candidate = await modelUser.findOne({username})
         const checkEmail = await modelUser.findOne({email})
         const errors: string[] = []

         if (candidate) {
            errors.push('Пользователь с этим именем уже существует.')
         }

         if (checkEmail) {
            errors.push('Пользователь с таким Email уже зарегестрирован.')
         }

         if (errors.length !== 0) {
            return res.status(400).json({
               message: errors
            })
         }

         const role = await modelRole.findOne({value: 'USER'})

         console.log(role)

         const token = getJWT(email, 'Sedfewrg', 'USER')
         const newHashPassword = hashPassword(password)
         const newUser = await modelUser.create({
            username,
            email,
            password: newHashPassword,
            token,
            role
         })
         await newUser.save()

         const dataResponse = await modelUser.findOne({username})


         return res.status(201).json({
            message: 'New user was created.',
            userData: dataResponse,
            token: token
         })

      } catch (e) {
         logger.error('Error register user.')
         logger.error(e)
         res.status(500).json({
            message: 'Error server in register new user.'
         })
      }
   }

   async login(req: Request, res: Response) {
      try {
         const {email, password} = req.body
         const user = await modelUser.findOne({email})

         if (!user) {
            return res.status(400).json({
               message: 'User with this email not a find.'
            })
         }

         const validPassword = bcrypt.compareSync(password, user.password)

         if (!validPassword) {
            return res.status(400).json({
               message: 'Password is not required.'
            })
         }

         return res.status(200).json({
            token: user.token
         })

      } catch (e) {
         logger.error('suck')
      }
   }

   // private getJWT(email: string, secret: string): Promise<string> {
   //    return new Promise<string>((resolve, reject) => {
   //       sign({
   //             email,
   //             iat: Math.floor(Date.now() / 1000),
   //
   //          }, secret, {
   //             algorithm: 'HS256'
   //          },
   //          (err, token) => {
   //             if (err) {
   //                reject(err)
   //             }
   //             resolve(token as string)
   //          })
   //    })
   // }

   getDataAboutAuthUser() {

   }
}

export default new userController()