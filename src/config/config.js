module.exports = {
	development: {
		database: {
			host: process.env.DB_HOST_REMOTE,
			port: process.env.DB_PORT_REMOTE,
			name: process.env.DB_NAME_REMOTE,
			dialect: process.env.DB_DIALECT_REMOTE,
			user: process.env.DB_USER_REMOTE,
			password: process.env.DB_PASSWORD_REMOTE
		}
	},
	
	production: {
		database: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT
		}
	}
};