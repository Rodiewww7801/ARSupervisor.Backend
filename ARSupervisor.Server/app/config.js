const dotenv = require("dotenv");

if (process.env.NODE_ENV) {
	const configFile = `./.env.${process.env.NODE_ENV}`;
	dotenv.config({ path: configFile });
} else {
	dotenv.config();
}

module.exports = {
	SECRET: process.env.SECRET,
	DB_USER: process.env.DB_USER,
	DB_HOST: process.env.DB_HOST,
	DB_PORT: process.env.DB_PORT,
	DB_NAME: process.env.DB_NAME,
	CLIENT_ID_IOS: process.env.CLIENT_ID_IOS,
};