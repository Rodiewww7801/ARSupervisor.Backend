function UserSession(userSessionRepository, tokenService, Role) {
	async function createUserSession(clientId, userId) {
		let role = await Role.getRoleById(userId);
		role = role ?? 'user';
		const { accessToken, refreshToken } = tokenService.generateTokens(clientId, userId, role);
		const userSession = await userSessionRepository.addUserSession(accessToken, refreshToken, clientId, userId);
		if(!userSession) {
			return null;
		}
		return {
			accessToken: userSession.accessToken,
			refreshToken: userSession.refreshToken,
			clientId: userSession.clientId,
			userId: userSession.userId,
			isRevokeuserd: userSession.isRevoked
		};
	}

	async function getUserSessionByAccessToken(accessToken) {
		const userSession = await userSessionRepository.getUserSessionByAccessToken(accessToken);
		if(!userSession) {
			return null;
		}
		return {
			accessToken: userSession.accessToken,
			refreshToken: userSession.refreshToken,
			clientId: userSession.clientId,
			userId: userSession.userId,
			isRevoked: userSession.isRevoked
		};
	}

	async function getUserSessionByRefreshToken(refreshToken) {
		const userSession = await userSessionRepository.getUserSessionByRefreshToken(refreshToken);
		if(!userSession) {
			return null;
		}
		return {
			accessToken: userSession.accessToken,
			refreshToken: userSession.refreshToken,
			clientId: userSession.clientId,
			userId: userSession.userId,
			isRevoked: userSession.isRevoked
		};
	}

	async function verifyTokenSign(token) {
		return await tokenService.verifyTokenSign(token);
	}

	return {
		createUserSession,
		verifyTokenSign,
		getUserSessionByAccessToken,
		getUserSessionByRefreshToken,
	}
}

module.exports = UserSession;
