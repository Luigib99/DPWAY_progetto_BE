const  User  = require('../model/User');
const Role = require ('../model/Role')

//READ ALL
const readAll = async () => {
    return await User.findAll({
        include: [
            {
                model: Role,
                as: 'Roles',
                attributes: ['id', 'name']
            }
        ]
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

//UPDATE USERNAME
const updateUsername = async (id, data) => {
    await User.update(data, { where: { id } });
};

//UPDATE EMAIL
const updateEmail = async (id, data) => {
    await User.update(data, { where: { id } });
};

//UPDATE PASSWORD
const updatePassword = async (id, data) => {
    await User.update(data, { where: { id } });
};

//DELETE
async function deleteUser(id) {
    return await User.destroy({
        where: { id }
    });
}

module.exports = {
    readAll,
    readById,
    createUser,
    updateUser,
    updateUsername,
    updateEmail,
    updatePassword,
    deleteUser,
};
