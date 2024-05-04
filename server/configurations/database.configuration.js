const { Sequelize } = require("sequelize");


const hostname = '10.200.215.74';
const port = 3306;
const database_name = 'webcup_competence';
const username = 'webcup';
const password = 'webcuppass';

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