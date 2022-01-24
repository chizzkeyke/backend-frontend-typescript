import { model, Schema } from 'mongoose'
import { UserInterface } from './user.interface'

const User = new Schema<UserInterface>({
   username: {type: 'string', required: true, unique: true},
   email: {type: 'string', required: true, unique: true},
   password: {type: 'string', required: true}
})

export const modelUser = model('User', User)