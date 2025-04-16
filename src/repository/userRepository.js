const User = require('../model/User');
const Role = require('../model/Role');

class UserRepository {
    static instance = null;

    constructor() {
        if (UserRepository.instance) {
            return UserRepository.instance;
        }
        UserRepository.instance = this;
    }

    //READ ALL
    async readAll() {
        return await User.findAll({
            include: [
                {
                    model: Role,
                    as: 'Roles',
                    attributes: ['id', 'name']
                }
            ]
        });
    }

    //READ BY ID
    async readById(id) {
        return await User.findByPk(id);
    }

    //CREATE
    async createUser(userData, transaction) {
        return await User.create(userData, { transaction });
    }

    //UPDATE USERNAME
    async updateUsername(id, body) {
        await User.update(
            {
                username: body.username,
                lastModifiedDate: new Date()
            },
            {
                where: { id }
            }
        );
    }

    //UPDATE EMAIL
    async updateEmail(id, body) {
        await User.update(
            {
                email: body.email,
                lastModifiedDate: new Date()
            },
            {
                where: { id }
            }
        );
    }

    //UPDATE PASSWORD
    async updatePassword(id, data) {
        await User.update(data, { where: { id } });
    }

    //DELETE
    async deleteUser(id) {
        return await User.destroy({
            where: { id }
        });
    }
}

module.exports = new UserRepository();
