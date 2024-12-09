const { Router } = require('express');
const auth = require('../../interface-adapters/middleware/auth.js');
const { userController } = require('../../interface-adapters/controllers/index.js');
const express = require('express');

const router = Router();
const apiRoute = '/api/user'

router.get(`${apiRoute}/:userId`, auth, (req, res) => {
  userController.handleGetUserInfo(req, res, req.params.userId)
});

router.get(`${apiRoute}/:userId/image`, auth, (req, res) => {
  userController.handleGetUserImage(req, res, req.params.userId)
});

router.post(`${apiRoute}/:userId/image`, express.raw({ type: 'image/*', limit: '10mb' }), auth, (req, res) => {
  userController.handleAddUserImage(req, res, req.params.userId)
});


module.exports = router;



