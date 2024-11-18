const { Router } = require('express');
const auth = require('../../interface-adapters/middleware/auth.js');
const { assetController } = require('../../interface-adapters/controllers/index.js');

const router = Router();
const apiRoute = '/api/asset'

router.get(`${apiRoute}/:assetId`, auth, (req, res) => {
  assetController.handleGetAsset(req, res, req.params.assetId)
});
router.post(`${apiRoute}/:assetId`, auth, (req, res) => {
  assetController.handleAddAsset(req, res, req.params.assetId)
});
router.post(`${apiRoute}/session/:assetsSessionId`, auth, (req, res) => {
  assetController.handleCreateAssetsSession(req, res, req.params.assetsSessionId)
});
router.get(`${apiRoute}/session/:assetsSessionId`, auth, (req, res) => {
  assetController.handleGetAssetsSession(req, res, req.params.assetsSessionId)
});
router.post(`${apiRoute}/:assetId/session/:assetsSessionId`, auth, (req, res) => {
  assetController.handleAddAssetToSession(req, res, req.params.assetId, req.params.assetsSessionId)
});
router.delete(`${apiRoute}/:assetId/session/:assetsSessionId`, auth, (req, res) => {
  assetController.handleDeleteAssetFromSession(req, res, req.params.assetId, req.params.assetsSessionId)
});

module.exports = router;

