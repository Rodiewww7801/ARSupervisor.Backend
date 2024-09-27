const bcrypt = require('bcrypt');
const { PasswordHashError } = require('../../errors/index.js');
const saltRounds = 10;

function passwordService() {
	async function hashPassword(password) {
		try {
			const salt = await bcrypt.genSalt(saltRounds);
			const hashedPassword = await bcrypt.hash(password, salt);
			return hashedPassword;
		} catch (err) {
			throw new PasswordHashError(err.message);
		}
	}
	
	async function verifyPassword(password, hashedPassword) {
		try {
			const match = await bcrypt.compare(password, hashedPassword);
			return match
		} catch (err) {
			throw new PasswordHashError(err.message);
		}
	}

	return Object.freeze({
		hashPassword,
		verifyPassword
	})
}


module.exports = passwordService;