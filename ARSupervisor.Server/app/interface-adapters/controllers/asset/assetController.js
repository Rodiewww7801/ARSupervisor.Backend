const { DomainError } = require('../../../domain/errors/index.js');
const Logger = require('../../../helpers/logger.js');
const { ValidationError, HTTPError } = require('../../errors/index.js');

function assetController(assetsSessionService) {
  function handleError(err, res) {
    if (err instanceof HTTPError) {
      const statusCode = err.statusCode;
      res.status(statusCode).json({ message: err.message });
    } else if (err instanceof DomainError) {
      const statusCode = 400;
      res.status(statusCode).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'Invalid request' });
    }
  }

  async function handleAddAsset(req, res, assetId) {
    try {
      const { name, description, measurment_unit } = req.body;
      const asset = await assetsSessionService.addAsset(assetId, name, description, measurment_unit);
      res.status(200).json({
        id: asset.id,
        name: asset.name || null,
        description: asset.description || null,
        measurement_unit: asset.measurment_unit || null
      });
    } catch (err) {
      Logger.logError(`handleAddAsset: ${err}`)
      handleError(err, res)
    }
  }

  async function handleGetAsset(req, res, assetId) {
    try {
      const asset = await assetsSessionService.getAssetById(assetId);
      res.status(200).json({
        id: asset.id,
        name: asset.name || null,
        description: asset.description || null,
        measurement_unit: asset.measurment_unit || null
      });
    } catch (err) {
      Logger.logError(`handleGetAsset: ${err}`)
      handleError(err, res)
    }
  }

  async function handleCreateAssetsSession(req, res, assetsSessionId) {
    try {
      let accessToken = req.cookies?.accessToken || req.body?.accessToken;
      if (!accessToken) {
        throw new ValidationError();
      }
      const assetsSession = await assetsSessionService.createAssetsSession(assetsSessionId, accessToken);
      res.status(200).json({
        id: assetsSession.id,
        ownerId: assetsSession.ownerId
      });
    } catch (err) {
      Logger.logError(`handleCreateAssetsSession: ${err}`)
      handleError(err, res)
    }
  }

  async function handleGetAssetsSession(req, res, assetsSessionId) {
    try {
      const assetsSession = await assetsSessionService.getAssetsSessionById(assetsSessionId);
      res.status(200).json({
        id: assetsSessionId,
        ownerId: assetsSession.ownerId,
        assets: assetsSession.assets
      });
    } catch (err) {
      Logger.logError(`handleGetAssetsSession: ${err}`)
      handleError(err, res)
    }
  }

  async function handleAddAssetToSession(req, res, assetId, assetsSessionId) {
    try {
      await assetsSessionService.addAssetToSession(assetsSessionId, assetId);
      res.status(200).json({ message: "Successfully added asset to session" });
    } catch (err) {
      Logger.logError(`handleAddAssetToSession: ${err}`)
      handleError(err, res)
    }
  }

  async function handleDeleteAssetFromSession(req, res, assetId, assetsSessionId) {
    try {
      await assetsSessionService.deleteAssetFromSession(assetsSessionId, assetId);
      res.status(200).json({ message: "Successfully deleted asset from session" });
    } catch (err) {
      Logger.logError(`handleDeleteAssetFromSession: ${err}`)
      handleError(err, res)
    }
  }

  return Object.freeze({
    handleAddAsset,
    handleGetAsset,
    handleAddAssetToSession,
    handleCreateAssetsSession,
    handleGetAssetsSession,
    handleDeleteAssetFromSession,
  });
}

module.exports = assetController;
