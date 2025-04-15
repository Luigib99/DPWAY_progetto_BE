const UserPassword = require("../model/UserPassword");

//CREA PASSWORD
const createUserPassword = async (userId, password, transaction) => {
    return await UserPassword.create({
        userId,
        password,
        createdDate: new Date()
    }, { transaction });
};

module.exports = {
    createUserPassword,
}