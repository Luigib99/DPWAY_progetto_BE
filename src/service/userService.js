const userRepository = require('../repository/userRepository');
const User = require('../model/User')
const UserRole = require('../model/UserRole')
const UserPassword = require('../model/UserPassword');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database').getSequelize();

//READ ALL
const readAll = async ()=> {
    return await userRepository.readAll();
}

//READ BY ID
const readById = async (id)=> {
    return await userRepository.readById(id);
}

//CREATE
const createUser = async (body) => {
    await verifyUser(body);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const transaction = await sequelize.transaction();

    try {
        const user = await userRepository.createUser({
            username: body.username,
            email: body.email,
            passwordExpirationDays: 90,
            createdDate: new Date(),
            active: true
        }, transaction);

        await userRepository.createUserPassword(user.id, hashedPassword, transaction);
        await userRepository.createUserRole(user.id, body.roleId || 1, transaction);

        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

//UPDATE
const updateUser = async (body, id) => {
    const userModified = await userRepository.findById(id);
    if (!userModified) throw new Error('Utente non trovato.');
    const currentEmail = userModified.email;
    const currentUsername = userModified.username;
    const currentPassword = userModified.password;

    await verifyUser(body, id, currentUsername, currentEmail, currentPassword);

    if (body.password) {
        body.password = await bcrypt.hash(body.password, 10);
    }

    await userRepository.updateUser(id, body);
    return await userRepository.findById(id);
};

//VALIDAZIONE
const verifyUser = async (body, id = null, currentUsername = null, currentEmail = null, currentPassword=null) => {
    const usernameRegex = /^[a-zA-Z0-9._]{4,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //CONTROLLO SE RISPETTANO LE REGOLE
    if (!body.username || !usernameRegex.test(body.username)) {
        throw new Error('Username non valido');
    }

    if (!body.email || !emailRegex.test(body.email)) {
        throw new Error('Email non valida');
    }

    if (!body.password || body.password.length < 6) {
        throw new Error('Password troppo corta');
    }

    // CONTROLLO SE SI RIPETONO
    if (body.username !== currentUsername) {
        const existingUsername = await userRepository.findUserByUsername(body.username);
        if (existingUsername) throw new Error('Username già in uso');
    }

    if (body.email !== currentEmail) {
        const existingEmail = await userRepository.findUserByEmail(body.email);
        if (existingEmail) throw new Error('Email già in uso');
    }

    if (body.password === currentPassword) {
       throw new Error('Stai usando la stessa password');
    }
};



module.exports = {
    readById,
    readAll,
    createUser,
    updateUser,
    verifyUser,
};
