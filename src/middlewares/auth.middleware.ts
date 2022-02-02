import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'


export class AuthMiddleware {
   constructor(private secret: string) {}

   execute(req: Request, res: Response, next: NextFunction) {
      if (req.headers.authorization) {
         verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
            if (err) {
               next()
            } else if (payload) {
               // req.user = payload.email
               next()
            }
         })
      }
   }
}
