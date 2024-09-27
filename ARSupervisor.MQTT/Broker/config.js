const dotenv = require("dotenv");

if (process.env.NODE_ENV) {
	const configFile = `./.env.${process.env.NODE_ENV}`;
	dotenv.config({ path: configFile });
} else {
	dotenv.config();
}

module.exports = {
	PORT: process.env.PORT,
	HOST: process.env.HOST,
	AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
};