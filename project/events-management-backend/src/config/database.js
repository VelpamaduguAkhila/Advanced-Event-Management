const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sys', 'root', 'Surya@2118', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => console.log('Connected...')).catch(err => console.error(err));

module.exports = sequelize;
