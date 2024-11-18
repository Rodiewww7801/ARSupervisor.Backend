const authControllerFactory = require('./auth/authController.js');
const assetControllerFactory = require('./asset/assetController.js');

const {
  userSessionService,
  assetsSessionService,
} = require('../../domain-services/index.js')

const authController = authControllerFactory(userSessionService);
const assetController = assetControllerFactory(assetsSessionService);

module.exports = {
  authController,
  assetController,
}
