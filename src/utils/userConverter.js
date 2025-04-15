// Importa il DTO e il modello
const UserDTO = require('../dto/UserDTO');
const Users = require('../model/User');

const modelToDTO = (user) => {
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
};

const DTOToModel = (userDTO) => {
    if (!userDTO) return null;

    return {
        id: userDTO.id,
        username: userDTO.username,
        email: userDTO.email,
        passwordExpirationDays: userDTO.passwordExpirationDays,
        createdDate: userDTO.createdDate,
        lastModifiedDate: userDTO.lastModifiedDate,
        active: userDTO.active
    };
};

module.exports = {
    modelToDTO,
    DTOToModel
};
