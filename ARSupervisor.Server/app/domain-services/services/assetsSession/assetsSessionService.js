const { ValidationError } = require('../../errors/index.js')

function assetsSessionService(Asset, AssetsSession, UserSession) {
  async function addAsset(id, name, description, measurement_unit) {
    if (!id) {
      throw new ValidationError();
    }
    const asset = await Asset.addAsset(id, name, description, measurement_unit);
    return asset;
  }

  async function getAssetById(assetId) {
    if (!assetId) {
      throw new ValidationError();
    }
    const asset = await Asset.getAssetById(assetId);
    return asset;
  }

  async function getAssets(name, offset, limit) {
    if (!(offset >= 0 || limit > 0)) {
      return [null, 0];
    }
    return await Asset.getAssets(name, offset, limit);
  }

  async function createAssetsSession(assetsSessionId, accessToken) {
    if (!accessToken) {
      throw new ValidationError();
    }
    const userSession = await UserSession.getUserSessionByAccessToken(accessToken);
    if (!userSession?.userId) {
      throw new ValidationError("Can't find user for that token");
    }
    const ownerId = userSession.userId;
    if (!ownerId) {
      throw new ValidationError();
    }
    const assetsSession = await AssetsSession.createAssetsSession(assetsSessionId, ownerId);
    return assetsSession
  }

  async function getAssetsSessionById(assetsSessionId) {
    if (!assetsSessionId) {
      throw new ValidationError();
    }
    const assetsSession = await AssetsSession.getAssetsSessionById(assetsSessionId);
    return assetsSession
  }

  async function addAssetToSession(assetsSessionId, assetId) {
    if (!assetsSessionId, !assetId) {
      throw new ValidationError();
    }
    await AssetsSession.addAsset(assetsSessionId, assetId)
  }

  async function deleteAssetFromSession(assetsSessionId, assetId) {
    if (!assetsSessionId, !assetId) {
      throw new ValidationError();
    }
    await AssetsSession.deleteAsset(assetsSessionId, assetId)
  }

  return Object.freeze({
    createAssetsSession,
    getAssetsSessionById,
    addAssetToSession,
    addAsset,
    getAssetById,
    getAssets,
    deleteAssetFromSession
  });
}

module.exports = assetsSessionService;


