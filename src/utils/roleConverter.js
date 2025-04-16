const RoleDTO = require('../DTO/RoleDTO');
const Role = require('../model/Role');

class RoleConverter {
    static instance = null;

    constructor() {
        if (RoleConverter.instance) {
            return RoleConverter.instance;
        }
        RoleConverter.instance = this;
    }

    modelToDTO(role) {
        if (!role) return null;
        const roleData = role.get();
        return new RoleDTO({
            id: roleData.id,
            name: roleData.name,
            description: roleData.description,
            createdDate: roleData.createdDate,
        });
    }
}

module.exports = new RoleConverter();
