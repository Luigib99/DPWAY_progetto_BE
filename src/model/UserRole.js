const { DataTypes } = require('sequelize');
const database = require('../config/database');
const sequelize = database.getSequelize();

const UserRole = sequelize.define('UserRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'userid'
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'roleid'
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createddate'
    }
}, {
    tableName: 'user_role',
    timestamps: false
});

module.exports = UserRole;
