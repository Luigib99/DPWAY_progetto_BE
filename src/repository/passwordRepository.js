const UserPassword = require("../model/UserPassword");

class UserPasswordRepository {
    static instance = null;

    constructor() {
        if (UserPasswordRepository.instance) {
            return UserPasswordRepository.instance;
        }
        UserPasswordRepository.instance = this;
    }

    // CREA PASSWORD
    async createUserPassword(userId, password, transaction) {
        return await UserPassword.create({
            userId,
            password,
            createdDate: new Date()
        }, { transaction });
    }

    // TROVA PASSWORD UTENTE
    async findUserPasswordsByUserId(userId) {
        return await UserPassword.findAll({
            where: { userId },
            order: [['createdDate', 'DESC']]
        });
    }
}

module.exports = new UserPasswordRepository();
