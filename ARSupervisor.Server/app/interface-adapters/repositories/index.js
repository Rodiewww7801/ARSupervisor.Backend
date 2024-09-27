const clientRepository = require('./sessions/clientRepository');
const roleRepository = require('./sessions/roleRepository');
const sessionRepository = require('./sessions/sessionRepository');
const userRepository = require('./users/userRepository');

module.exports = {
	clientRepository,
	roleRepository,
	sessionRepository,
	userRepository
}