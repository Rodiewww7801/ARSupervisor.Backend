const Logger = require('../../helpers/logger.js');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    Logger.logInfo(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

module.exports = requestLogger;

