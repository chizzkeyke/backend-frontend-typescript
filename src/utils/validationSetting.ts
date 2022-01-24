import validator from 'validator'

interface validateParamInterface {
   username: string
   email: string
   password: string
   confirmPassword: string
}

export async function validationExamination(obj: validateParamInterface): Promise<boolean | string> {
   const {username, email, password, confirmPassword} = obj
   const rulesForUsername = validator.isLength(username, {min: 4, max: 15})
   const rulesForPasswords = password === confirmPassword
   const validEmail = validator.isEmail(email)

   if (!rulesForUsername) {
      return 'Min length is 4 and max length 15 for username.'
   }

   if (!rulesForPasswords) {
      return 'Password and confirm password must be the same.'
   }

   if (!validEmail) {
      return 'Email is not a valid'
   }

   return true
}
