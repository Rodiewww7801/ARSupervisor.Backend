const dotenv = require("dotenv");

if (process.env.NODE_ENV) {
	const configFile = `./.env.${process.env.NODE_ENV}`;
	dotenv.config({ path: configFile });
} else {
	dotenv.config();
}

module.exports = {
	BROKER_PORT: process.env.BROKER_PORT,
	BROKER_HOST: process.env.BROKER_HOST,
	BACKEND_URL: process.env.BACKEND_URL,
};