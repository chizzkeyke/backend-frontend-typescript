import validator from 'validator'

interface paramsValidationInterface {
   username: string
   email: string
   password: string
   confirmPassword: string
}

export function validateControl(obj: paramsValidationInterface) {
   return new Promise((resolve, reject) => {
      const errors: string[] = []
      const {email, password, confirmPassword} = obj

      if (!validator.isEmail(email)) {
         errors.push('Not a valid email.')
      }

      if (!validator.isLength(password, {max: 20, min: 7})) {
         errors.push('Max length password is 20, min length: 7')
      }

      if (!validator.equals(password, confirmPassword)) {
         errors.push('Password and confirm password not equal.')
      }

      if (errors.length == 0) {
         resolve('All good.')
      } else {
         reject(errors)
      }
   })
}