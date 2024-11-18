const clientRepository = require('./clientRepository');
const roleRepository = require('./roleRepository');
const userSessionRepository = require('./userSessionRepository');
const userRepository = require('./userRepository');
const assetsSessionRepository = require('./assetsSessionRepository.js')
const assetRepository = require('./assetRepository.js')

module.exports = {
  clientRepository,
  roleRepository,
  userSessionRepository,
  userRepository,
  assetRepository,
  assetsSessionRepository
}
