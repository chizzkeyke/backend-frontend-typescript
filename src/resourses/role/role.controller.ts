import { modelRole } from "./role.model";

class RoleController {
    async setRoleToDb() {
        const user = await modelRole.create({value: 'USER'})
        const admin = await modelRole.create({value: 'ADMIN'})

        await user.save()
        await admin.save()
    }
}

export default new RoleController()