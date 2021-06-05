const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define('Users', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	name: {
		allowNull: false,
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	},
	cpf: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/i
		}	
	},
	pwd: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = User;