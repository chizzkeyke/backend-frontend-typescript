import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
   if (req.method === 'OPTIONS') {
      next()
   }

   try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
         return res.status(403).json({
            error: 'User is not authenticated.'
         })
      }

      const decodedData = verify(token, 'Sedfewrg')
      next()
   } catch (e) {
      return res.status(500).json({
         message: 'Error on server.'
      })
   }
}