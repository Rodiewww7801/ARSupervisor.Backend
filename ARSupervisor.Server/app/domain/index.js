const userFactory = require('./users/User');
const clientFactory = require('./userSessions/Client');
const userSessionFactory = require('./userSessions/UserSession');
const roleFactory = require('./userSessions/Role');

const {
	userRepository,
	clientRepository,
	userSessionRepository,
	roleRepository } = require('../interface-adapters/repositories/index.js');

const passwordService = require('../domain-services/services/userSessions/passwordService.js');
const tokenService = require('../domain-services/services/userSessions/tokenService.js')

const User = userFactory(userRepository, passwordService());
const Client = clientFactory(clientRepository);
const Role = roleFactory(roleRepository);
const UserSession = userSessionFactory(userSessionRepository, tokenService(), Role);

module.exports = {
	User,
	Client,
	UserSession,
	Role,
}
