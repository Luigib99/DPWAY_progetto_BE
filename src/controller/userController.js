const User = require('../model/User');
const UserPassword = require('../model/UserPassword');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database').getSequelize();
const userRepository = require('../repository/userRepository');
const userService = require('../service/userService');

//READ ALL
const readAll = async (req,res) => {
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
const readById = async (req, res) => {
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
};

//CREATE
const createUser = async (req, res) => {
    try {
        const body = req.body;
        const newUserDTO = await userService.createUser(body);
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
};

//UPDATE
const updateUser = async (req,res) =>{
    const { id } = req.params;
    try{
        const body = req.body;
        const modifiedUserDTO = await userService.updateUser(body, id);
        res.status(201).json({
            message: 'Utente modificato con successo',
            user: modifiedUserDTO
        });
    }
    catch (error){
        console.error('Errore nella modifica dell\'utente', error);
        res.status(400).json({
            message: 'Errore nella modifica dell\'utente',
            error: error.message
        })
    }
}

//UPDATE USERNAME
const updateUsername = async (req,res) =>{
    const { id } = req.params;
    try{
        const body = req.body;
        const modifiedUserDTO = await userService.updateUsername(body, id);
        res.status(201).json({
            message: 'Utente modificato con successo',
            user: modifiedUserDTO
        });
    }
    catch (error){
        console.error('Errore nella modifica dell\'utente', error);
        res.status(400).json({
            message: 'Errore nella modifica dell\'utente',
            error: error.message
        })
    }
}

//UPDATE EMAIL
const updateEmail = async (req,res) =>{
    const { id } = req.params;
    try{
        const body = req.body;
        const modifiedUserDTO = await userService.updateEmail(body, id);
        res.status(201).json({
            message: 'Utente modificato con successo',
            user: modifiedUserDTO
        });
    }
    catch (error){
        console.error('Errore nella modifica dell\'utente', error);
        res.status(400).json({
            message: 'Errore nella modifica dell\'utente',
            error: error.message
        })
    }
}

//UPDATE PASSWORD
const updatePassword = async (req,res) =>{
    const { id } = req.params;
    try{
        const body = req.body;
        const modifiedUserDTO = await userService.updatePassword(body, id);
        res.status(201).json({
            message: 'Utente modificato con successo',
            user: modifiedUserDTO
        });
    }
    catch (error){
        console.error('Errore nella modifica dell\'utente', error);
        res.status(400).json({
            message: 'Errore nella modifica dell\'utente',
            error: error.message
        })
    }
}


//DELETE
const deleteUser = async (req,res)=>{
    const { id } = req.params;
    try{
        const userDeletedDTO = await userService.deleteUser(id);
        res.status(200).json({
            message: 'Utente eliminato con successo',
            user: userDeletedDTO
        });
    } catch (error){
        console.error('Errore nell\'eliminazione dell\'utente', error);
        res.status(400).json({
            message: 'Errore nell\'eliminazione dell\'utente',
            error: error.message
        })
    }
}

module.exports = {
    createUser,
    readAll,
    readById,
    updateUser,
    updateUsername,
    updateEmail,
    updatePassword,
    deleteUser
};
