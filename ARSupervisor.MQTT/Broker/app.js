// Simple in-memory MQTTBroker
// Created to test MQTT for the ARSupervisor project
//
// I think it will be rewritten to a cluster approach in the future.

const config = require('./config.js');
const axios = require('axios');
const aedes = require('aedes')({ id: 'BROKER_1' });
const server = require('http').createServer()
const ws = require('websocket-stream')
const PORT = config.PORT;
const HOST = config.HOST;
const AUTH_SERVER_URL = config.AUTH_SERVER_URL;


aedes.authenticate = async (client, username, password, callback) => {
	try {
		const response = await axios.post(`${AUTH_SERVER_URL}/login`, {
			username: username,
			password: password.toString()
		});

		if (response.status == 200) {
			callback(null, true);
		} else {
			callback(new Error('Authentification failed'), false);
		}
	} catch (err) {
		callback(new Error(err.message), false);
	}
}

ws.createServer({ server: server }, aedes.handle)

server.listen(PORT, HOST, function () {
	console.log('MQTT.Broker: listening on ws://%s:%s ', HOST, PORT);
	//aedes.publish({ topic: 'welcome/hello', payload: "I'm broker " + aedes.id });
});

server.on('error', function (err) {
	console.log('MQTT.Broker: Server error', err);
	process.exit(1);
});

aedes.on('subscribe', function (subscriptions, client) {
	console.log('MQTT.Broker: Client \x1b[32m' + (client ? client.id : client) +
		'\x1b[0m subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n'), 'from broker', aedes.id);
});

aedes.on('unsubscribe', function (subscriptions, client) {
	console.log('MQTT.Broker: Client \x1b[32m' + (client ? client.id : client) +
		'\x1b[0m unsubscribed to topics: ' + subscriptions.join('\n'), 'from broker', aedes.id);
});

// fired when a client connects
aedes.on('client', function (client) {
	console.log('MQTT.Broker: Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
});

// fired when a client disconnects
aedes.on('clientDisconnect', function (client) {
	console.log('MQTT.Broker: Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
});

// fired when a message is published
aedes.on('publish', async function (packet, client) {
	if (packet.topic == `$SYS/${aedes.id}/heartbeat`) {
		return;
	}
	console.log('MQTT.Broker: Client \x1b[31m' + (client ? client.id : aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id);
});