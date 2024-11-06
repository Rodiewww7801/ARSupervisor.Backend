function UserSession(userSessionRepository, Role) {
	async function createUserSession(clientId, userId, accessToken, refreshToken) {
		let role = await Role.getRoleById(userId);
		role = role ?? 'user';
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

	return {
		createUserSession,
		getUserSessionByAccessToken,
		getUserSessionByRefreshToken,
	}
}

module.exports = UserSession;
