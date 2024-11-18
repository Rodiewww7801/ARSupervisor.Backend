const { AssetsSessionAlreadyExist, AssetsSessionDosentExist } = require('../errors/index.js');

function AssetsSession(assetsSessionRepository) {
  async function createAssetsSession(assetsSessionId, ownerId) {
    let assetsSession = await assetsSessionRepository.getAssetsSessionById(assetsSessionId);
    if (assetsSession) {
      throw new AssetsSessionAlreadyExist(assetsSessionId);
    }
    assetsSession = await assetsSessionRepository.createAssetsSession(assetsSessionId, ownerId);
    return {
      id: assetsSession.id,
      ownerId: assetsSession.ownerId
    }
  }

  async function addAsset(assetsSessionId, assetId) {
    const assetSession = await assetsSessionRepository.getAssetsSessionById(assetsSessionId)
    if (!assetSession) {
      throw new AssetsSessionDosentExist(assetsSessionId);
    }
    await assetsSessionRepository.addAsset(assetsSessionId, assetId)
  }

  async function getAssetsSessionById(assetsSessionId) {
    const assetsSession = await assetsSessionRepository.getAssetsSessionById(assetsSessionId)
    if (!assetsSession) {
      throw new AssetsSessionDosentExist(assetsSessionId);
    }
    return {
      id: assetsSession.id,
      ownerId: assetsSession.ownerId,
      assets: assetsSession.assets,
    }
  }

  async function deleteAsset(assetsSessionId, assetId) {
    const assetsSession = await assetsSessionRepository.getAssetsSessionById(assetsSessionId)
    if (!assetsSession) {
      throw new AssetsSessionDosentExist(assetsSessionId);
    }
    await assetsSessionRepository.deleteAsset(assetsSessionId, assetId)
  }

  return {
    createAssetsSession,
    addAsset,
    deleteAsset,
    getAssetsSessionById
  }
}

module.exports = AssetsSession;
