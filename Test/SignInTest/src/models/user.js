const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = User;
