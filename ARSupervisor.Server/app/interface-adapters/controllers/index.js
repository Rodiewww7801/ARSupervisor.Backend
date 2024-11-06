const authControllerFactory = require('./auth/authController.js');

const { userSessionService } = require('../../domain-services/index.js')

const authController = authControllerFactory(userSessionService)

module.exports = {
	authController
}
