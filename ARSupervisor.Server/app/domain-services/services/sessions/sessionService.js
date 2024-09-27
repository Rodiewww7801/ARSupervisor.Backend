const { ValidationError } = require('../../errors/index.js');

function sessionService(User, Session) {
	async function signupSession(username, password, clientId) {
		if(!username, !password, !clientId) {
			throw new ValidationError()
		}
		const user = await User.createUser(username, password);
		const session = await Session.createSession(clientId, user.id);
		return { ...user, session };
	}

	async function loginSession(username, password, clientId) {
		if(!username, !password, !clientId) {
			throw new ValidationError()
		}
		const user = await User.getUserByUsername(username);
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

	async function refreshSession(refreshToken) {
		if(!refreshToken) {
			throw new ValidationError()
		}
		const decodedJWT = await Session.verifyTokenSign(refreshToken)
		const session = await Session.getSessionByRefreshToken(refreshToken);
		if (!validateToken(decodedJWT, session)) {
			throw new ValidationError();
		}
		return await Session.createSession(session.clientId, session.userId);
	}

	return Object.freeze({
		loginSession,
		signupSession,
		refreshSession,
	});
}

module.exports = sessionService;