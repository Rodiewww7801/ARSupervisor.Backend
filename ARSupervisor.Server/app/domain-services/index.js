function bootstraper() {
  const passwordServiceFactory = require('./services/userSessions/passwordService.js');
  const tokenServiceFactory = require('./services/userSessions/tokenService.js');
  const userSessionServiceFactory = require('./services/userSessions/userSessionService.js');
  const assetsSessionServcieFactory = require('./services/assetsSession/assetsSessionService.js');
  const userServiceFactory = require('./services/userService/userService.js');

  const {
    User,
    UserSession,
    Client,
    Role,
    Asset,
    AssetsSession,
  } = require('../domain/index.js');

  const passwordService = passwordServiceFactory();
  const tokenService = tokenServiceFactory();
  const userSessionService = userSessionServiceFactory(User, UserSession, Client, Role, tokenService);
  const assetsSessionService = assetsSessionServcieFactory(Asset, AssetsSession, UserSession);
  const userService = userServiceFactory(User, Role);

  return {
    passwordService,
    userSessionService,
    tokenService,
    assetsSessionService,
    userService,
  };
}

module.exports = bootstraper();
