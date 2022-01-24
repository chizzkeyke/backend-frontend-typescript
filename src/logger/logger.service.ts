import { Logger } from 'tslog'
import { LoggerServiceInterface } from './logger.interface'

class LoggerService implements LoggerServiceInterface{
   public logger: Logger

   constructor() {
      this.logger = new Logger({
         displayFilePath: 'hidden',
         displayLoggerName: false,
         displayInstanceName: false,
         displayFunctionName: false
      })
   }

   log(...args: unknown[]) {
      this.logger.info(...args)
   }

   error(...args: unknown[]) {
      this.logger.error(...args)
   }

   warn(...args: unknown[]) {
      this.logger.warn(...args)
   }
}

export default new LoggerService()


