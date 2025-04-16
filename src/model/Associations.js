const User = require('./User');
const Role = require('./Role');
const UserRole = require('./UserRole');
const UserPassword = require('./UserPassword');
const Blacklist = require('./Blacklist');

// RELAZIONE MANY-TO-MANY TRA USER e ROLE
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'roleId',
    onDelete: 'CASCADE'
});

// RELAZIONE ONE-TO-MANY TRA USER e USER_ROLE
User.hasMany(UserRole, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserRole.belongsTo(User, { foreignKey: 'userId' });

// RELAZIONE ONE-TO-MANY TRA ROLE e USER_ROLE
Role.hasMany(UserRole, { foreignKey: 'roleId', onDelete: 'CASCADE' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

// RELAZIONE ONE-TO-MANY TRA USER e USER_PASSWORD
User.hasMany(UserPassword, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserPassword.belongsTo(User, { foreignKey: 'userId' });

// RELAZIONE ONE-TO-MANY TRA USER e BLACKLIST
User.hasMany(Blacklist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Blacklist.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Role, UserRole, UserPassword, Blacklist };
