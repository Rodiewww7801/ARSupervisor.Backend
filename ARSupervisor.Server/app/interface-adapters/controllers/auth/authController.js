const Logger = require('../../../helpers/logger.js');
const { UnsupportedClient } = require("../../../domain-services/errors/index.js");
const { UserAllreadyExist, UserDosentExist } = require("../../../domain/errors/index.js");
const { ValidationError, HTTPError } = require("../../errors/index.js");

function authController(userSessionService) {
  function handleError(err, res) {
    if (err instanceof HTTPError) {
      const statusCode = err.statusCode;
      res.status(statusCode).json({ message: err.message });
    } else if (
      err instanceof UserAllreadyExist ||
      err instanceof UserDosentExist ||
      err instanceof UnsupportedClient) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'Invalid request' });
    }
  }


  async function handleRegister(req, res) {
    try {
      const { email, password } = req.body;
      const clientId = req.header('Client');
      await userSessionService.registerUser(email, password, clientId);
      res.status(200).json({ message: 'Registration is successfull' });
    } catch (err) {
      Logger.logError(`handleRegister: ${err}`)
      handleError(err, res)
    }
  }

  async function handleLogin(req, res) {
    try {
      const { email, password } = req.body;
      const clientId = req.header('Client');
      const userSession = await userSessionService.loginUser(email, password, clientId);
      if (process.nativeApps.includes(userSession.clientId)) {
        res.status(200).json({
          accessToken: userSession.accessToken,
          refreshToken: userSession.refreshToken
        });
      } else {
        setUserSessionToCookie(res, userSession)
        res.status(200).json({ message: 'Authenticated successfully' });
      }
    } catch (err) {
      Logger.logError(`handleLogin: ${err}`)
      handleError(err, res)
    }
  }

  async function handleRefresh(req, res) {
    try {
      const clientId = req.header('Client');
      let refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
      if (!refreshToken) {
        throw new ValidationError(400, 'Refresh token required')
      }
      const newUserSession = await userSessionService.refreshUserSession(refreshToken, clientId);
      if (process.nativeApps.includes(newUserSession.clientId)) {
        res.status(200).json({
          accessToken: newUserSession.accessToken,
          refreshToken: newUserSession.refreshToken
        });
      } else {
        setUserSessionToCookie(res, newUserSession);
        res.status(200).json({ message: 'User session is refreshed successfully' });
      }
    } catch (err) {
      Logger.logError(`handleRefresh: ${err}`)
      handleError(err, res)
    }
  }

  function setUserSessionToCookie(res, userSession) {
    res.cookie('accessToken', userSession.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'Strict'
    });
    res.cookie('refreshToken', userSession.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'Strict'
    });
  }

  return Object.freeze({
    handleRegister,
    handleLogin,
    handleRefresh
  })
}

module.exports = authController;
