const authControllerFactory = require('./auth/authController.js');

const { sessionService } = require('../../domain-services/index.js')

const authController = authControllerFactory(sessionService)

module.exports = {
	authController
}