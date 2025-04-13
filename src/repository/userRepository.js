const  User  = require('../model/User');
const Role = require ('../model/Role')
const UserPassword = require('../model/UserPassword');
const UserRole = require('../model/UserRole');

//READ ALL
const readAll = async () => {
    return await User.findAll({
        include: {
            model: Role,
            attributes: ['name'],
            through: { attributes: [] },
        },
    });
};

//READ BY ID
const readById = async (id) => {
    return await User.findByPk(id);
};

//CREATE
const createUser = async (userData, transaction) => {
    return await User.create(userData, { transaction });
};

//UPDATE
const updateUser = async (id, data) => {
    await User.update(data, { where: { id } });
};

const findById = async (id) => {
    return await User.findByPk(id);
};

const createUserPassword = async (userId, password, transaction) => {
    return await UserPassword.create({
        userId,
        password,
        createdDate: new Date()
    }, { transaction });
};

const createUserRole = async (userId, roleId, transaction) => {
    return await UserRole.create({
        userId,
        roleId,
        createdDate: new Date()
    }, { transaction });
};

const findUserByUsername = async (username) => {
    return await User.findOne({ where: { username } });
};

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

module.exports = {
    readAll,
    readById,
    createUser,
    createUserPassword,
    createUserRole,
    findUserByUsername,
    findUserByEmail,
    updateUser,
    findById
};
