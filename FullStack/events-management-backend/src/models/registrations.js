const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Registrations = sequelize.define('event_registrations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    registration_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false
});

module.exports = Registrations;
