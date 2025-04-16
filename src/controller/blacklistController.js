const blacklistService = require('../service/blacklistService');

class BlacklistController {
    static instance = null;

    constructor() {
        if (BlacklistController.instance) {
            return BlacklistController.instance;
        }
        BlacklistController.instance = this;
    }

    //INSERT
    async insert(req, res) {
        try {
            const userId = req.params.userId;
            const newUserDTO = await blacklistService.insert(userId);
            res.status(201).json({
                message: 'Utente inserito nella blacklist',
                userDTO: newUserDTO
            });
        } catch (error) {
            console.error('Errore', error);
            res.status(400).json({
                message: 'Errore',
                error: error.message
            });
        }
    }

    //REMOVE
    async remove(req, res) {
        try {
            const userId = req.params.userId;
            const newUserDTO = await blacklistService.remove(userId);
            res.status(201).json({
                message: 'Utente rimosso dalla blacklist',
                userDTO: newUserDTO
            });
        } catch (error) {
            console.error('Errore', error);
            res.status(400).json({
                message: 'Errore',
                error: error.message
            });
        }
    }
}

module.exports = new BlacklistController();
