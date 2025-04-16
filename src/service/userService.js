const userRepository = require('../repository/userRepository');
const roleRepository = require('../repository/roleRepository');
const utilsRepository = require('../repository/utilsRepository');
const passwordRepository = require('../repository/passwordRepository');
const userConverter = require('../utils/userConverter');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database').getSequelize();

class UserService {
    static instance = null;

    constructor() {
        if (UserService.instance) {
            return UserService.instance;
        }
        UserService.instance = this;
    }

    //READ ALL
    async readAll() {
        const users = await userRepository.readAll();
        const usersDTO = [];

        for (const user of users) {
            usersDTO.push(userConverter.modelToDTO(user));
        }
        return usersDTO;
    }

    //READ BY ID
    async readById(id) {
        const user = await userRepository.readById(id);
        if (!user) {
            throw new Error('Utente non trovato');
        }
        const userDTO = userConverter.modelToDTO(user);
        return userDTO;
    }

    //CREATE
    async createUser(body, userId) {
        await this.verifyUser(body);
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
            await roleRepository.createUserRole(user.id, body.roleId || userId, transaction);

            await transaction.commit();
            const userDTO = userConverter.modelToDTO(user);
            return userDTO;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    //UPDATE USERNAME
    async updateUsername(body, id) {
        const userModified = await utilsRepository.findById(id);
        if (!userModified) throw new Error('Utente non trovato.');
        const currentUsername = userModified.username;

        await this.verifyUser(body, id, currentUsername);

        await userRepository.updateUsername(id, {
            ...body,
            lastModifiedDate: new Date()
        });

        const userSaved = await userRepository.readById(id);
        const userSavedDTO = userConverter.modelToDTO(userSaved);
        return userSavedDTO;
    }

    //UPDATE EMAIL
    async updateEmail(body, id) {
        const userModified = await utilsRepository.findById(id);
        if (!userModified) throw new Error('Utente non trovato.');
        const currentEmail = userModified.email;

        await this.verifyUser(body, id, currentEmail);

        await userRepository.updateEmail(id, {
            ...body,
            lastModifiedDate: new Date()
        });

        const userSaved = await userRepository.readById(id);
        const userSavedDTO = userConverter.modelToDTO(userSaved);
        return userSavedDTO;
    }

    // UPDATE PASSWORD
    async updatePassword(body, id) {
        await this.verifyUser(body, id);

        const hashedPassword = await bcrypt.hash(body.password, 10);
        const transaction = await sequelize.transaction();

        try {
            const user = await utilsRepository.findById(id);
            if (!user) throw new Error('Utente non trovato');

            // Recupera tutte le password precedenti dell'utente
            const oldPasswords = await passwordRepository.findUserPasswordsByUserId(id);

            // Controlla se la nuova password è già stata usata
            for (const pass of oldPasswords) {
                const isMatch = await bcrypt.compare(body.password, pass.password);
                if (isMatch) {
                    throw new Error('Hai già utilizzato questa password in passato. Scegline una diversa.');
                }
            }

            // Salva la nuova password
            await passwordRepository.createUserPassword(user.id, hashedPassword, transaction);

            await user.update({ lastModifiedDate: new Date() }, { transaction });

            await transaction.commit();
            return user;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    //DELETE
    async deleteUser(id) {
        const userDeleted = await userRepository.readById(id);
        const userDeletedDTO = userConverter.modelToDTO(userDeleted);
        await userRepository.deleteUser(id);
        return userDeletedDTO;
    }

    //VERIFICA L'UTENTE
    async verifyUser(body, id = null, currentUsername = null, currentEmail = null, currentPassword = null) {
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
    }
}

module.exports = new UserService();
