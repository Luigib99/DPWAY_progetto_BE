const roleService = require('../service/roleService');

class RoleController {
    static instance = null;

    constructor() {
        if (RoleController.instance) {
            return RoleController.instance;
        }
        RoleController.instance = this;
    }

    //READ ALL
    async readAll(req, res) {
        try {
            const rolesDTO = await roleService.readAll();
            res.status(200).json({
                message: 'Ruoli letti con successo',
                roles: rolesDTO
            });
        } catch (error) {
            console.error('Errore nella lettura dei ruoli:', error);
            res.status(400).json({
                message: 'Errore nella lettura dei ruoli',
                error: error.message
            });
        }
    }
}

module.exports = new RoleController();
