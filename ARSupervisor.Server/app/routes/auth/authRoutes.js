const { Router } = require('express');
const { authController } = require('../../interface-adapters/controllers/index.js');

const router = Router();

router.post('/signup', authController.handleSignup);
router.post('/login', authController.handleLogin);
router.post('/refresh', authController.handleRefresh);

module.exports = router;