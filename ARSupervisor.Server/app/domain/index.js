const userFactory = require('./users/User');
const clientFactory = require('./sessions/Client');
const sessionFactory = require('./sessions/Session');
const roleFactory = require('./sessions/Role');

const {
	userRepository,
	clientRepository,
	sessionRepository,
	roleRepository } = require('../interface-adapters/repositories/index.js');

const passwordService = require('../domain-services/services/sessions/passwordService.js');
const tokenService = require('../domain-services/services/sessions/tokenService.js')

const User = userFactory(userRepository, passwordService());
const Client = clientFactory(clientRepository);
const Role = roleFactory(roleRepository);
const Session = sessionFactory(sessionRepository, tokenService(), Role);

module.exports = {
	User,
	Client,
	Session,
	Role,
}