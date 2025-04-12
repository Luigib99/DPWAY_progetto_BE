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
    await validateUserData(body);
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

//VALIDAZIONE
const validateUserData = async (body) => {
    const usernameRegex = /^[a-zA-Z0-9._]{4,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!body.username || !usernameRegex.test(body.username)) {
        throw new Error('Username non valido');
    }

    if (!body.email || !emailRegex.test(body.email)) {
        throw new Error('Email non valida');
    }

    if (!body.password || body.password.length < 6) {
        throw new Error('Password troppo corta');
    }

    const existingUsername = await userRepository.findUserByUsername(body.username);
    if (existingUsername) throw new Error('Username già in uso');

    const existingEmail = await userRepository.findUserByEmail(body.email);
    if (existingEmail) throw new Error('Email già in uso');
};


module.exports = {
    readById,
    readAll,
    createUser,
    validateUserData,
};
