const config = require('./config.js')
const Logger = require('./helpers/logger.js')
const express = require('express');
const cookieParser = require('cookie-parser');
const { getIPAddress } = require('./helpers/index.js');
const { authRoutes, assetRoutes, userRoutes } = require('./routes/index.js');
const requestLogger = require('./interface-adapters/middleware/requestLogger.js')
require('./database/database.js')

process.nativeApps = ['ARSupervisor.IOS'];

const PORT = config.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(authRoutes);
app.use(assetRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  const IPv4 = getIPAddress();
  Logger.log(`listening on http://${IPv4}:${PORT}`);
});
