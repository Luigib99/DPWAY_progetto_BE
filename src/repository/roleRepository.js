const UserRole = require("../model/UserRole");
const Role = require("../model/Role");

class UserRoleService {
    static instance = null;

    constructor() {
        if (UserRoleService.instance) {
            return UserRoleService.instance;
        }
        UserRoleService.instance = this;
    }

    //READ ALL
    async readAll() {
        return await Role.findAll();
    }

    //CREA RUOLO
    async createUserRole(userId, roleId, transaction) {
        return await UserRole.create({
            userId,
            roleId,
            createdDate: new Date()
        }, { transaction });
    }
}

module.exports = new UserRoleService();
