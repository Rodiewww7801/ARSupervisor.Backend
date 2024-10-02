const { Router } = require('express');
const { authController } = require('../../interface-adapters/controllers/index.js');

const router = Router();
const apiRoute = "/api/authentication"

router.post(`${apiRoute}/register`, authController.handleRegister);
router.post(`${apiRoute}/login`, authController.handleLogin);
router.post(`${apiRoute}/refresh`, authController.handleRefresh);

module.exports = router;