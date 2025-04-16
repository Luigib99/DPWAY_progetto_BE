const User = require("../model/User");

class UserRepository {
    static instance = null;

    constructor() {
        if (UserRepository.instance) {
            return UserRepository.instance;
        }
        UserRepository.instance = this;
    }

    // CERCA L'UTENTE DALL'ID
    async findById(id) {
        return await User.findByPk(id);
    }

    // CERCA L'UTENTE DALL'USERNAME
    async findUserByUsername(username) {
        return await User.findOne({ where: { username } });
    }

    // CERCA L'UTENTE DALLA MAIL
    async findUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }
}

module.exports = new UserRepository();
