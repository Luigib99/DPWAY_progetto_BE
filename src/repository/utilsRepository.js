const User = require("../model/User");

//CERCA L'UTENTE DALL'ID
const findById = async (id) => {
    return await User.findByPk(id);
};

//CERCA L'UTENTE DALL'USERNAME
const findUserByUsername = async (username) => {
    return await User.findOne({ where: { username } });
};

//CERCA L'UTENTE DALLA MAIL
const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

module.exports= {
    findById,
    findUserByUsername,
    findUserByEmail
}