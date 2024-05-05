const { Sequelize } = require("sequelize");


const hostname = '185.161.10.160';
const port = 3306;
const database_name = 'cupcake_web';
const username = 'cupcake_dba';
const password = 'Batmèn203';

const sequelize = new Sequelize(
    database_name,
    username,
    password,
    {
        host: hostname,
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;
