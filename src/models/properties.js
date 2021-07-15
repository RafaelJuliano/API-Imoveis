const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Property = sequelize.define('Properties', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false		
	},
	cep: {
		allowNull: false,
		type: Sequelize.STRING,
		validate:{
			is: /^\d{5}-\d{3}$/i
		}	
	},
	number: {
		allowNull: false,
		type: Sequelize.INTEGER	
	},
	complement: {
      		type: Sequelize.STRING,
      		allowNull: true
   	},
   	price: {
     		type: Sequelize.DECIMAL(10,2),
     		allowNull: false,		
    	},
	rooms: {
		allowNull: false,
		type: Sequelize.INTEGER
	},
	available: {	
		type: Sequelize.BOOLEAN,
		defaultValue: true
	}
});

module.exports = Property;