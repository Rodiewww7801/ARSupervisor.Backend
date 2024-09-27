function Session(sessionRepository, tokenService, Role) {
	async function createSession(clientId, userId) {
		let role = await Role.getRoleById(userId);
		role = role ?? 'user';
		const { accessToken, refreshToken } = tokenService.generateTokens(clientId, userId, role);
		const session = await sessionRepository.addSession(accessToken, refreshToken, clientId, userId);
		if(!session) {
			return null;
		}
		return {
			accessToken: session.accessToken,
			refreshToken: session.refreshToken,
			clientId: session.clientId,
			userId: session.userId,
			isRevoked: session.isRevoked
		};
	}

	async function getSessionByAccessToken(accessToken) {
		const session = await sessionRepository.getSessionByAccessToken(accessToken);
		if(!session) {
			return null;
		}
		return {
			accessToken: session.accessToken,
			refreshToken: session.refreshToken,
			clientId: session.clientId,
			userId: session.userId,
			isRevoked: session.isRevoked
		};
	}

	async function getSessionByRefreshToken(refreshToken) {
		const session = await sessionRepository.getSessionByRefreshToken(refreshToken);
		if(!session) {
			return null;
		}
		return {
			accessToken: session.accessToken,
			refreshToken: session.refreshToken,
			clientId: session.clientId,
			userId: session.userId,
			isRevoked: session.isRevoked
		};
	}

	async function verifyTokenSign(token) {
		return await tokenService.verifyTokenSign(token);
	}

	return {
		createSession,
		verifyTokenSign,
		getSessionByAccessToken,
		getSessionByRefreshToken,
	}
}

module.exports = Session;