const { ValidationError, UnsupportedClient } = require('../../errors/index.js');

function userSessionService(User, UserSession, Client) {
	async function registerUser(email, password, clientId) {
		if(!email, !password, !clientId) {
			throw new ValidationError()
		}
		const isClientExist = await Client.getClientById(clientId);
		if (!isClientExist) {
			throw new UnsupportedClient()
		}
		const user = await User.createUser(email, password);
		return user;
	}

	async function loginUser(email, password, clientId) {
		if(!email, !password, !clientId) {
			throw new ValidationError()
		}
		const isClientExist = await Client.getClientById(clientId);
		if (!isClientExist) {
			throw new UnsupportedClient()
		}
		const user = await User.getUserByEmail(email);
		const verifiedPassword = await User.verifyPassword(password, user.hashedPassword);
		if (!user || !verifiedPassword) {
			throw new ValidationError();
		}
		return await UserSession.createUserSession(clientId, user.id);;
	}

	function validateToken(decodedToken, userSession) {
		if(!decodedToken, !userSession) {
			throw new ValidationError()
		}
		if (userSession.isRevoked ||
			decodedToken.clientId !== userSession.clientId ||
			decodedToken.userId !== userSession.userId) {
			return false
		}

		return true
	}

	async function refreshUserSession(refreshToken, clientId) {
		if(!refreshToken) {
			throw new ValidationError()
		}
		const isClientExist = await Client.getClientById(clientId);
		if (!isClientExist) {
			throw new UnsupportedClient()
		}
		const decodedJWT = await UserSession.verifyTokenSign(refreshToken)
		if (decodedJWT.clientId != clientId) {
			throw new ValidationError();
		}
		const userSession = await UserSession.getUserSessionByRefreshToken(refreshToken);
		if (!validateToken(decodedJWT, userSession)) {
			throw new ValidationError();
		}
		return await UserSession.createUserSession(userSession.clientId, userSession.userId);
	}

	return Object.freeze({
		loginUser,
		registerUser,
		refreshUserSession,
	});
}

module.exports = userSessionService;
