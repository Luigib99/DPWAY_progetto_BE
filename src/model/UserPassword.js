const { DataTypes } = require('sequelize');
const database = require('../config/database');
const sequelize = database.getSequelize();

const UserPassword = sequelize.define('UserPassword', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'userid'
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createddate'
    }
}, {
    tableName: 'user_password',
    timestamps: false
});

module.exports = UserPassword;
