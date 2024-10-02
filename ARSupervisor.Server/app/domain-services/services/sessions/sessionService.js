const { ValidationError } = require('../../errors/index.js');

function sessionService(User, Session) {
	async function registerUser(email, password, clientId) {
		if(!email, !password, !clientId) {
			throw new ValidationError()
		}
		const user = await User.createUser(email, password);
		return user;
	}

	async function loginUser(email, password, clientId) {
		if(!email, !password, !clientId) {
			throw new ValidationError()
		}
		const user = await User.getUserByEmail(email);
		const verifiedPassword = await User.verifyPassword(password, user.hashedPassword);
		if (!user || !verifiedPassword) {
			throw new ValidationError();
		}
		return await Session.createSession(clientId, user.id);;
	}

	function validateToken(decodedToken, session) {
		if(!decodedToken, !session) {
			throw new ValidationError()
		}
		if (session.isRevoked ||
			decodedToken.clientId !== session.clientId ||
			decodedToken.userId !== session.userId) {
			return false
		}

		return true
	}

	async function refreshSession(refreshToken, clientId) {
		if(!refreshToken) {
			throw new ValidationError()
		}
		const decodedJWT = await Session.verifyTokenSign(refreshToken)
		if (decodedJWT.clientId != clientId) {
			throw new ValidationError();
		}
		const session = await Session.getSessionByRefreshToken(refreshToken);
		if (!validateToken(decodedJWT, session)) {
			throw new ValidationError();
		}
		return await Session.createSession(session.clientId, session.userId);
	}

	return Object.freeze({
		loginUser,
		registerUser,
		refreshSession,
	});
}

module.exports = sessionService;