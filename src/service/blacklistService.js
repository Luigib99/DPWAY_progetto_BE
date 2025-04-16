const blacklistRepository  = require('../repository/blacklistRepository');
const userConverter = require('../utils/userConverter');
const sequelize = require('../config/database').getSequelize();

class BlacklistService {
    static instance = null;

    constructor() {
        if (BlacklistService.instance) {
            return BlacklistService.instance;
        }
        BlacklistService.instance = this;
    }

    //INSERT
    async insert(userId) {
        const transaction = await sequelize.transaction();

        try {
            const user = await blacklistRepository.insert(transaction, userId);
            await transaction.commit();
            const userDTO = userConverter.modelToDTO(user);
            return userDTO;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    //REMOVE
    async remove(userId) {
        const user = await blacklistRepository.remove(userId);
        const userDeletedDTO = userConverter.modelToDTO(user);
        return userDeletedDTO;
    }
}

module.exports = new BlacklistService();
