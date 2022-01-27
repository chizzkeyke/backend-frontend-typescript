import { Schema, model } from 'mongoose'
import { RoleInterface } from './role.interface'

const Role = new Schema({
   role: {type: String, required: true, default: 'USER'}
})

export const modelRole = model<RoleInterface>('Role', Role)