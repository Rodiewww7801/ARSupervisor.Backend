function bootstraper() {
	const passwordServiceFactory = require('./services/sessions/passwordService.js');
	const tokenServiceFactory = require('./services/sessions/tokenService.js');
	const sessionServiceFactory = require('./services/sessions/sessionService.js');
	
	const { User, Session } = require('../domain/index.js');

	const passwordService = passwordServiceFactory();
	const tokenService = tokenServiceFactory();
	const sessionService = sessionServiceFactory(User, Session);

	return {
		passwordService,
		sessionService,
		tokenService
	};
}

module.exports = bootstraper();