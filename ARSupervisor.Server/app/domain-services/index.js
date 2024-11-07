function bootstraper() {
	const passwordServiceFactory = require('./services/userSessions/passwordService.js');
	const tokenServiceFactory = require('./services/userSessions/tokenService.js');
	const userSessionServiceFactory = require('./services/userSessions/userSessionService.js');
	
	const { User, UserSession, Client, Role } = require('../domain/index.js');

	const passwordService = passwordServiceFactory();
	const tokenService = tokenServiceFactory();
	const userSessionService = userSessionServiceFactory(User, UserSession, Client, Role, tokenService);

	return {
		passwordService,
		userSessionService,
		tokenService
	};
}

module.exports = bootstraper();
