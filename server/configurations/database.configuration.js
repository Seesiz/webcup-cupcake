const { Sequelize } = require("sequelize");


const hostname = 'localhost';
const port = 3306;
const database_name = 'webcup';
const username = 'root';
const password = 'root';

const sequelize = new Sequelize(
    database_name, 
    username, 
    password, 
    {
        host: hostname,
        dialect: 'mysql'
    }
);

module.exports = sequelize;