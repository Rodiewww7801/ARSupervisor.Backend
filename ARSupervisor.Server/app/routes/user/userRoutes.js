const { Router } = require('express');
const auth = require('../../interface-adapters/middleware/auth.js');
const { userController } = require('../../interface-adapters/controllers/index.js');

const router = Router();
const apiRoute = '/api/user'

router.get(`${apiRoute}/:userId`, auth, (req, res) => {
  userController.handleGetUserInfo(req, res, req.params.userId)
});

module.exports = router;



