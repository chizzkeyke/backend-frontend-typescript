export interface LoggerServiceInterface{
   logger: unknown
   log: (...args: unknown[]) => void
   warn: (...args: unknown[]) => void
   error: (...args: unknown[]) => void
}