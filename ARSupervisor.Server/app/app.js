const config = require('./config.js')
const express = require('express');
const cookieParser = require('cookie-parser');
const { getIPAddress } = require('./helpers/index.js');
const { authRoutes,  secretRoutes } = require('./routes/index.js');
const { Client } = require('./domain/index.js'); 
const database = require('./database/database.js')

process.nativeApps = [config.CLIENT_ID_IOS];

database.createDatabaseIfNeeded(async () => {
	const grants =  ['password', 'client_credentials'];
	await Client.createClient('ARSupervisor.IOS', 'ARSupervisor.IOS', crypto.randomUUID().toString(), grants);
	await Client.createClient('Web', 'Web', crypto.randomUUID().toString(), grants);
});

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(secretRoutes);

app.listen(PORT, () => {
	const IPv4 = getIPAddress();
	console.log('Server: listening on http://%s:%s', IPv4, PORT)
});
