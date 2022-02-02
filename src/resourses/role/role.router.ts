import { Router } from 'express'
import RoleController  from './role.controller'

const routerRole = Router()

routerRole.get('/role', RoleController.setRoleToDb)

export {routerRole}