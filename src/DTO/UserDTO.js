class UserDTO {
    constructor({ id, username, email, passwordExpirationDays, createdDate, lastModifiedDate, active, Roles = [] }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordExpirationDays = passwordExpirationDays;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.active = active;
        this.Roles = Roles;
    }
}

module.exports = UserDTO;
