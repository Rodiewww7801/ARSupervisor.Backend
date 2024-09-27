const config = require('./config.js');

const axios = require('axios');
const mqtt = require('mqtt');
const HOST = config.BROKER_HOST;
const PORT = config.BROKER_PORT;
const AUTH_SERVER_URL = config.AUTH_SERVER_URL;
const username = 'mock_data_client'
const password = '123'


async function start() {
  try {
    await axios.post(`${AUTH_SERVER_URL}/signup`, {
      username: username,
      password: password
    });
  } catch (err) {
    const message = err?.response?.data || err.message;
    console.log('MQTT.Client.MockData: failed signup request with message: ', message);
  }

  const client = mqtt.connect(`ws://${HOST}:${PORT}`, {
    username: username,
    password: password,
    clientId: username,
  });

  client.on('connect', function () {
    console.log('MQTT.Client.MockData: connected to broker');
    client.publish('test/topic', 'Hello MQTT !', function () {
      //client.end(); // Close the connection
    });
  });
}

setTimeout( () => {
  start();
}, 2000);