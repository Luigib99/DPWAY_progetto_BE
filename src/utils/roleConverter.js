const RoleDTO = require('../DTO/RoleDTO');

class RoleConverter {
    static instance = null;

    constructor() {
        if (RoleConverter.instance) {
            return RoleConverter.instance;
        }
        RoleConverter.instance = this;
    }

    //MODEL TO DTO
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
