const { DataTypes } = require('sequelize');
const database = require('../config/database');
const sequelize = database.getSequelize();

const Role = sequelize.define('Roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createddate'
    },
},{
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;