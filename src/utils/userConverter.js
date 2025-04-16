const UserDTO = require('../dto/UserDTO');

class UserConverter {
    static instance = null;

    constructor() {
        if (UserConverter.instance) {
            return UserConverter.instance;
        }
        UserConverter.instance = this;
    }

    modelToDTO(user) {
        if (!user) return null;
        const userData = user.get();

        return new UserDTO({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            passwordExpirationDays: userData.passwordExpirationDays,
            createdDate: userData.createdDate,
            lastModifiedDate: userData.lastModifiedDate,
            active: userData.active,
            Roles: userData.Roles || [],
        });
    }
}

module.exports = new UserConverter();
