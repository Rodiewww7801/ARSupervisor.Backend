const authControllerFactory = require('./auth/authController.js');
const assetControllerFactory = require('./asset/assetController.js');
const userControllerFactory = require('./user/userController.js');

const {
  userSessionService,
  assetsSessionService,
  userService,
} = require('../../domain-services/index.js')

const authController = authControllerFactory(userSessionService);
const assetController = assetControllerFactory(assetsSessionService);
const userController = userControllerFactory(userService);

module.exports = {
  authController,
  assetController,
  userController,
}
