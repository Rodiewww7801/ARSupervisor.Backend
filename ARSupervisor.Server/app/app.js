const config = require('./config.js')
const Logger = require('./helpers/logger.js')
const express = require('express');
const cookieParser = require('cookie-parser');
const { getIPAddress } = require('./helpers/index.js');
const { authRoutes, secretRoutes } = require('./routes/index.js');
require('./database/database.js')

process.nativeApps = ['ARSupervisor.IOS'];

const PORT = config.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(secretRoutes);

app.listen(PORT, () => {
  const IPv4 = getIPAddress();
  Logger.log(`listening on http://${IPv4}:${PORT}`);
});
