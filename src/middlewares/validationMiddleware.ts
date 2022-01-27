import { Request, Response, NextFunction } from 'express'
import { validateControl } from '../utils/validationSetting'
import logger from '../logger/logger.service'

export const validationMiddlewareCreateUser = (req: Request, res: Response, next: NextFunction) => {
   validateControl(req.body)
      .then(() => {
         next()
      })
      .catch((err) => {
         logger.error(err)
         res.status(400).json({
            err
         })
      })
}