const userService = require('../service/userService');

class UserController {
    static instance = null;

    constructor() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = this;
    }

    //READ ALL
    async readAll(req, res) {
        try {
            const usersDTO = await userService.readAll();
            res.status(200).json({
                message: 'Utenti letti con successo',
                users: usersDTO
            });
        } catch (error) {
            console.error('Errore nella lettura degli utenti:', error);
            res.status(400).json({
                message: 'Errore nella lettura degli utenti',
                error: error.message
            });
        }
    }

    //READ BY ID
    async readById(req, res) {
        const { id } = req.params;
        try {
            const userDTO = await userService.readById(id);
            return res.status(200).json({
                message: 'Utente trovato con successo',
                user: userDTO
            });
        } catch (error) {
            return res.status(500).json({ message: 'Errore nella risposta', error: error.message });
        }
    }

    //CREATE
    async createUser(req, res) {
        try {
            const body = req.body;
            const idRole = req.params.idRole;
            const newUserDTO = await userService.createUser(body, idRole);
            res.status(201).json({
                message: 'Utente creato con successo',
                userDTO: newUserDTO
            });
        } catch (error) {
            console.error('Errore nella creazione dell\'utente:', error);
            res.status(400).json({
                message: 'Errore nella creazione dell\'utente',
                error: error.message
            });
        }
    }

    //UPDATE USERNAME
    async updateUsername(req, res) {
        const { id } = req.params;
        try {
            const body = req.body;
            const modifiedUserDTO = await userService.updateUsername(body, id);
            res.status(201).json({
                message: 'Utente modificato con successo',
                user: modifiedUserDTO
            });
        } catch (error) {
            console.error('Errore nella modifica dell\'utente', error);
            res.status(400).json({
                message: 'Errore nella modifica dell\'utente',
                error: error.message
            });
        }
    }

    //UPDATE EMAIL
    async updateEmail(req, res) {
        const { id } = req.params;
        try {
            const body = req.body;
            const modifiedUserDTO = await userService.updateEmail(body, id);
            res.status(201).json({
                message: 'Utente modificato con successo',
                user: modifiedUserDTO
            });
        } catch (error) {
            console.error('Errore nella modifica dell\'utente', error);
            res.status(400).json({
                message: 'Errore nella modifica dell\'utente',
                error: error.message
            });
        }
    }

    //UPDATE PASSWORD
    async updatePassword(req, res) {
        const { id } = req.params;
        try {
            const body = req.body;
            const modifiedUserDTO = await userService.updatePassword(body, id);
            res.status(201).json({
                message: 'Utente modificato con successo',
                user: modifiedUserDTO
            });
        } catch (error) {
            console.error('Errore nella modifica dell\'utente', error);
            res.status(400).json({
                message: 'Errore nella modifica dell\'utente',
                error: error.message
            });
        }
    }

    //DELETE
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const userDeletedDTO = await userService.deleteUser(id);
            res.status(200).json({
                message: 'Utente eliminato con successo',
                user: userDeletedDTO
            });
        } catch (error) {
            console.error('Errore nell\'eliminazione dell\'utente', error);
            res.status(400).json({
                message: 'Errore nell\'eliminazione dell\'utente',
                error: error.message
            });
        }
    }
}

module.exports = new UserController();
