// Simple in-memory MQTTBroker
// Created to test MQTT for the ARSupervisor project
//
// I think it will be rewritten to a cluster approach in the future.

const config = require('./config.js');
const LoggerObj = require('../../CustomLogger/Logger.js');
const Logger = new LoggerObj('MQTT.Broker');
const axios = require('axios');
const aedes = require('aedes')({ id: 'BROKER_1' });
const server = require('http').createServer()
const ws = require('websocket-stream')
const PORT = config.PORT;
const HOST = '0.0.0.0';
const BACKEND_URL = config.BACKEND_URL;


aedes.authenticate = async (client, username, password, callback) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
      email: username,
      password: password.toString()
    }, {
      headers: {
        'Client': client.id,
        'Content-Type': 'application/json',
      }
    });

    if (response.status == 200) {
      callback(null, true);
    } else {
      callback(new Error('Authentification failed'), false);
    }
  } catch (err) {
    Logger.logError(`${err}`)
    callback(new Error(err.message), false);
  }
}

ws.createServer({ server: server }, aedes.handle)

server.listen(PORT, HOST, function () {
  Logger.logInfo(`listening on ws://${HOST}:${PORT}`);
  //aedes.publish({ topic: 'welcome/hello', payload: "I'm broker " + aedes.id });
});

server.on('error', function (err) {
  Logger.logError(`${err}`);
  process.exit(1);
});

aedes.on('subscribe', function (subscriptions, client) {
  Logger.log('Client ' + (client ? client.id : client) +
    'subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n') + ' from broker ' + aedes.id);
});

aedes.on('unsubscribe', function (subscriptions, client) {
  Logger.log('Client ' + (client ? client.id : client) +
    'unsubscribed to topics: ' + subscriptions.join('\n') + ' from broker ' + aedes.id);
});

// fired when a client connects
aedes.on('client', function (client) {
  Logger.log('Client Connected: ' + (client ? client.id : client) + ' to broker ' + aedes.id);
});

// fired when a client disconnects
aedes.on('clientDisconnect', function (client) {
  Logger.log('Client Disconnected: ' + (client ? client.id : client) + ' to broker ' + aedes.id);
});

// fired when a message is published
aedes.on('publish', async function (packet, client) {
  if (packet.topic == `$SYS/${aedes.id}/heartbeat`) {
    return;
  }
  //Logger.log('Client ' + (client ? client.id : aedes.id) + ' has published ' + packet.payload.toString() + 'on ' + packet.topic + ' to broker ' + aedes.id);
});
