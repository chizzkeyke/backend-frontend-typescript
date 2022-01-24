import { Request, Response, NextFunction } from 'express'
import { validationExamination } from '../utils/validationSetting'
import logger from '../logger/logger.service'

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
   validationExamination(req.body)
      .then(() => {
         logger.log('Проверка удачно пройдена')
         next()
      })
      .catch((e) => {
         logger.error('Ошибка валидации')
         res.status(400).json({
            message: e.message
         })
      })
}