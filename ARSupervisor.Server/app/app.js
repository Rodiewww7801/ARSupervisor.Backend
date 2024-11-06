const config = require('./config.js')
const LoggerObj = require('../../CustomLogger/Logger.js');
const Logger = new LoggerObj('API.Server')
const express = require('express');
const cookieParser = require('cookie-parser');
const { getIPAddress } = require('./helpers/index.js');
const { authRoutes,  secretRoutes } = require('./routes/index.js');
const { Client } = require('./domain/index.js'); 
const database = require('./database/database.js')

process.nativeApps = ['ARSupervisor.IOS'];

async function addClients() {
	await Client.createClient('ARSupervisor.IOS', 'ARSupervisor.IOS', crypto.randomUUID().toString(), ['password']);
	await Client.createClient('Postman', 'Postman', crypto.randomUUID().toString(), ['password']);
	await Client.createClient('MQTT.Client', 'MQTT.Client', crypto.randomUUID().toString(), ['client_credentials']);
}

database.createDatabaseIfNeeded(async () => {
	await addClients();
});

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
