const config = require('../../../config.js');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('../../errors/index.js');
const accessTokenLife = '10m'
const refreshTokenLife = '1h'

function tokenService() {
  function generateAccessToken(clientId, userId, role) {
    if (!clientId, !userId, !role) {
      throw new ValidationError();
    }
    const options = {
      expiresIn: accessTokenLife,
    }
    const payload = {
      clientId: clientId,
      userId: userId,
      role: role
    }
    const accessToken = jwt.sign(payload, config.SECRET, options);
    return accessToken;
  }

  function generateRefreshToken(clientId, userId, role) {
    if (!clientId, !userId, !role) {
      throw new ValidationError();
    }
    const options = {
      expiresIn: refreshTokenLife,
    }
    const payload = {
      clientId: clientId,
      userId: userId,
      role: role
    }
    const refreshToken = jwt.sign(payload, config.SECRET, options);
    return refreshToken;
  }

  function generateTokens(clientId, userId, role) {
    if (!clientId, !userId, !role) {
      throw new ValidationError();
    }
    const accessToken = generateAccessToken(clientId, userId, role);
    const refreshToken = generateRefreshToken(clientId, userId, role);
    return { accessToken, refreshToken };
  }

  async function verifyTokenSign(token) {
    if (!token) {
      throw new ValidationError();
    }
    try {
      const decodedJWT = jwt.verify(token, config.SECRET);
      return decodedJWT;
    } catch (err) {
      throw new ValidationError(err.message);
    }
  }

  return Object.freeze({
    generateTokens,
    verifyTokenSign
  });
}

module.exports = tokenService;
