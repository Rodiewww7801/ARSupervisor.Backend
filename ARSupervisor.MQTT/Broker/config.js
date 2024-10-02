const dotenv = require("dotenv");

if (process.env.NODE_ENV) {
	const configFile = `./.env.${process.env.NODE_ENV}`;
	dotenv.config({ path: configFile });
} else {
	dotenv.config();
}

module.exports = {
	PORT: process.env.PORT,
	BACKEND_URL: process.env.BACKEND_URL,
};