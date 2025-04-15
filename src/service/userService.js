const userRepository = require('../repository/userRepository');
const roleRepository = require('../repository/roleRepository');
const utilsRepository = require('../repository/utilsRepository');
const passwordRepository = require('../repository/passwordRepository')
const userConverter = require('../utils/userConverter')
const UserDTO = require('../dto/UserDTO');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database').getSequelize();

//READ ALL
const readAll = async () => {
    const users = await userRepository.readAll();
    const usersDTO = [];

    for (const user of users) {
        usersDTO.push(userConverter.modelToDTO(user));
    }
    return usersDTO;
};

//READ BY ID
const readById = async (id)=> {
    const user = await userRepository.readById(id);
    if (!user) {
        throw new Error('Utente non trovato');
    }
    const userDTO = userConverter.modelToDTO(user)
    return userDTO;
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

        await passwordRepository.createUserPassword(user.id, hashedPassword, transaction);
        await roleRepository.createUserRole(user.id, body.roleId || 1, transaction);

        await transaction.commit();
        const userDTO = userConverter.modelToDTO(user)
        return userDTO;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

//UPDATE
const updateUser = async (body, id) => {
    const userModified = await utilsRepository.findById(id);
    if (!userModified) throw new Error('Utente non trovato.');
    const currentEmail = userModified.email;
    const currentUsername = userModified.username;
    const currentPassword = userModified.password;

    await verifyUser(body, id, currentUsername, currentEmail, currentPassword);

    if (body.password) {
        body.password = await bcrypt.hash(body.password, 10);
    }

    await userRepository.updateUser(id, body);
    const userSaved =  userRepository.readById(id)
    const userSavedDTO = userConverter.modelToDTO(userSaved)
    return await userSavedDTO;
};
//UPDATE USERNAME
const updateUsername = async (body, id) => {
    const userModified = await utilsRepository.findById(id);
    if (!userModified) throw new Error('Utente non trovato.');
    const currentUsername = userModified.username;

    await verifyUser(body, id, currentUsername);
    await userRepository.updateUsername(id, body);
    const userSaved = await  userRepository.readById(id)
    const userSavedDTO = userConverter.modelToDTO(userSaved)
    return await userSavedDTO;
};
//UPDATE EMAIL
const updateEmail = async (body, id) => {
    const userModified = await utilsRepository.findById(id);
    if (!userModified) throw new Error('Utente non trovato.');
    const currentEmail = userModified.email;

    await verifyUser(body, id, currentEmail);

    await userRepository.updateEmail(id, body);
    const userSaved =  await userRepository.readById(id)
    const userSavedDTO = userConverter.modelToDTO(userSaved)
    return await userSavedDTO;
};
//UPDATE PASSWORD
const updatePassword = async (body, id) => {
    await verifyUser(body, id);

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const transaction = await sequelize.transaction();

    try {
        const user = await utilsRepository.findById(id);
        if (!user) throw new Error('Utente non trovato');

        await passwordRepository.createUserPassword(user.id, hashedPassword, transaction);
        await transaction.commit();

        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

//DELETE
const deleteUser = async (id)=>{
    const userDeleted = await userRepository.readById(id)
    const userDeletedDTO = userConverter.modelToDTO(userDeleted)
    await userRepository.deleteUser(id);
    return userDeletedDTO;
}

//VERIFICA L'UTENTE
const verifyUser = async (body, id = null, currentUsername = null, currentEmail = null, currentPassword = null) => {
    const usernameRegex = /^[a-zA-Z0-9._]{4,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // USERNAME
    if (body.username !== undefined) {
        if (!usernameRegex.test(body.username)) {
            throw new Error('Username non valido');
        }

        if (body.username !== currentUsername) {
            const existingUsername = await utilsRepository.findUserByUsername(body.username);
            if (existingUsername) throw new Error('Username già in uso');
        }
    }

    // EMAIL
    if (body.email !== undefined) {
        if (!emailRegex.test(body.email)) {
            throw new Error('Email non valida');
        }

        if (body.email !== currentEmail) {
            const existingEmail = await utilsRepository.findUserByEmail(body.email);
            if (existingEmail) throw new Error('Email già in uso');
        }
    }

    // PASSWORD
    if (body.password !== undefined) {
        if (body.password.length < 6) {
            throw new Error('Password troppo corta');
        }

        if (body.password === currentPassword) {
            throw new Error('Stai usando la stessa password');
        }
    }
};





module.exports = {
    readById,
    readAll,
    createUser,
    updateUser,
    updateUsername,
    updateEmail,
    updatePassword,
    deleteUser,
    verifyUser
};
