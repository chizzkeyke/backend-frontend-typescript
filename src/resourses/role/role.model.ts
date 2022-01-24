import {Schema, model} from 'mongoose'
import {RoleInterface} from './role.interface'

const Role = new Schema<RoleInterface>({
   role: []
})