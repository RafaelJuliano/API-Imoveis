const Sequelize = require("sequelize");

const environment = process.env.NODE_ENV || "development";

const config = require("../config/config.js")[environment];
console.log(process.env.NODE_ENV);
//Instância do obejto sequelize utilizado nos models.
const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
      host: process.env.DATABASE_URL,
      dialect: config.database.dialect
    }
);


module.exports = sequelize;