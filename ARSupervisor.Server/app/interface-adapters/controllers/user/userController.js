const { DomainError } = require('../../../domain/errors/index.js');
const Logger = require('../../../helpers/logger.js');
const { ValidationError, HTTPError } = require('../../errors/index.js');
const { UserDosentExist } = require("../../../domain/errors/index.js");

function userController(userService) {
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

  async function handleGetUserInfo(req, res, userId) {
    try {
      if (!userId) {
        throw new ValidationError();
      }
      const userInfo = await userService.getUserInfoById(userId);
      if (!userInfo) {
        throw new UserDosentExist();
      }
      res.status(200).json({
        id: userInfo.id,
        email: userInfo.email,
        imageURL: userInfo?.imageURL || null,
        firstName: userInfo?.firstName || null,
        lastName: userInfo?.lastName || null,
        role: userInfo.role,
      });
    } catch (err) {
      Logger.logError(`handleGetUserInfo: ${err}`)
      handleError(err, res)
    }
  }

  return Object.freeze({
    handleGetUserInfo
  });
}

module.exports = userController;
