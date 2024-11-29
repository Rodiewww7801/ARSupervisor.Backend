const httpHelper = require('../../helpers/httpHelpers.js');
const { ValidationError, AuthenticationError, HTTPError } = require('../errors/index.js');
const { tokenService } = require('../../domain-services/index.js');

function handleError(err, res) {
  if (err instanceof HTTPError) {
    const statusCode = err.statusCode;
    res.status(statusCode).json({ message: err.message });
  } else {
    res.status(404).json({ message: 'Invalid request' });
  }
}

async function auth(req, res, next) {
  try {
    let accessToken = req.cookies?.accessToken || req.headers?.authorization;
    if (!accessToken) {
      throw new ValidationError(401, 'Access token required');
    }
    try {
      const decodedJWT = await tokenService.verifyTokenSign(accessToken);
      if (!decodedJWT) {
        throw new AuthenticationError()
      }
      next()
    } catch (err) {
      throw new AuthenticationError()
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = auth;
