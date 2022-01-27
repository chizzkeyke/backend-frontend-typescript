import { model, Schema } from 'mongoose'
import { UserInterface } from './user.interface'

const User = new Schema({
   username: {type: 'string', required: true, unique: true},
   email: {type: 'string', required: true, unique: true},
   password: {type: 'string', required: true},
   token: {type: 'string', required: true, unique: true},
   role: {type: 'string', required: true, ref: 'Role'}
})

export const modelUser = model<UserInterface>("User", User)