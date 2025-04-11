const User = require('../model/User');
const { UserPassword } = require('../model/UserPassword');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database').getSequelize();
const userRepository = require('../repository/userRepository');
const userService = require('../service/userService');

/*// CREATE
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json({
            message: 'Utente creato con successo',
            user: newUser
        });
    } catch (error) {
        console.error('Errore nella creazione dell\'utente:', error);
        res.status(400).json({
            message: 'Errore nella creazione dell\'utente',
            error: error.message
        });
    }
};*/

//READALL
const readAll = async (req,res) => {
    try {
        const users = await userService.readAll();
        res.status(200).json({
            message: 'Utenti letti con successo',
            users: users
        });
    } catch (error) {
        console.error('Errore nella lettura degli utenti:', error);
        res.status(400).json({
            message: 'Errore nella lettura degli utenti',
            error: error.message
        });
    }
}

//READBYID
const readById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

module.exports = {
    readAll,
    readById};
