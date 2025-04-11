const  User  = require('../model/User');

//READ ALL
const readAll = async () => {
    return await User.findAll();
};

//READ BY ID
const readById = async (id) => {
    return await User.findByPk(id);
};

module.exports = {
    readAll,
    readById
};
