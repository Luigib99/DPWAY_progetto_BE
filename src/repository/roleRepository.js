const UserRole = require("../model/UserRole");

//CREA RUOLO
const createUserRole = async (userId, roleId, transaction) => {
    return await UserRole.create({
        userId,
        roleId,
        createdDate: new Date()
    }, { transaction });
};

module.exports = {
    createUserRole
}