const Sequelize = require("sequelize");

const environment = process.env.NODE_ENV || "development";

const config = require("../config/config.js")[environment];

//Instância do obejto sequelize utilizado nos models.
/*const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
      host: process.env.DATABASE_URL,
      dialect: config.database.dialect
    }
);*/

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: true
  }
});

module.exports = sequelize;