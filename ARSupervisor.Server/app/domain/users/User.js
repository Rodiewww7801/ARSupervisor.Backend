const { UserAllreadyExist } = require('../errors/index.js');

function User(userRepository, passwordService) {
	async function createUser(username, password) {
		const hashedPassword = await passwordService.hashPassword(password);
		const id = crypto.randomUUID().toString();
		const isUserExist = await userRepository.getUserByUsername(username);
		if (isUserExist) {
			throw new UserAllreadyExist(username);
		}
		const user = await userRepository.addUser(id, username, hashedPassword);
		if(!user) {
			return null;
		}
		return {
			id: user.id,
			username: user.username,
			hashedPassword: user.hashedPassword
		};
	}

	async function getUserByUsername(username) {
		const user = await userRepository.getUserByUsername(username);
		if(!user) {
			return null;
		}
		return {
			id: user.id,
			username: user.username,
			hashedPassword: user.hashedPassword
		};
	}

	async function verifyPassword(password, hashedPassword) {
		const verifiedPassword = await passwordService.verifyPassword(password, hashedPassword)
		return verifiedPassword
	}

	return {
		createUser,
		getUserByUsername,
		verifyPassword
	}
}

module.exports = User;