const userFactory = require('./users/User');
const clientFactory = require('./userSessions/Client');
const userSessionFactory = require('./userSessions/UserSession');
const roleFactory = require('./userSessions/Role');
const assetFactory = require('./assetsSessions/Asset.js');
const assetsSessionFactory = require('./assetsSessions/AssetsSession.js');

const {
  userRepository,
  clientRepository,
  userSessionRepository,
  roleRepository,
  assetRepository,
  assetsSessionRepository
} = require('../interface-adapters/repositories/index.js');

const passwordService = require('../domain-services/services/userSessions/passwordService.js');

const User = userFactory(userRepository, passwordService());
const Client = clientFactory(clientRepository);
const Role = roleFactory(roleRepository);
const UserSession = userSessionFactory(userSessionRepository, Role);
const Asset = assetFactory(assetRepository);
const AssetsSession = assetsSessionFactory(assetsSessionRepository);

module.exports = {
  User,
  Client,
  UserSession,
  Role,
  Asset,
  AssetsSession,
}
