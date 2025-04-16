const roleRepository = require('../repository/roleRepository');
const roleConverter = require('../utils/roleConverter');

class RoleService {
    static instance = null;

    constructor() {
        if (RoleService.instance) {
            return RoleService.instance;
        }
        RoleService.instance = this;
    }

    //READ ALL
    async readAll() {
        const roles = await roleRepository.readAll();
        const rolesDTO = [];

        for (const role of roles) {
            rolesDTO.push(roleConverter.modelToDTO(role));
        }
        return rolesDTO;
    }
}

module.exports = new RoleService();
