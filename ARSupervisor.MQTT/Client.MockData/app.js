const config = require('./config.js');

const axios = require('axios');
const mqtt = require('mqtt');
const LoggerObj = require('../../CustomLogger/Logger.js');
const Logger = new LoggerObj('MQTT.MockData');
const HOST = config.BROKER_HOST;
const PORT = config.BROKER_PORT;
const BACKEND_URL = config.BACKEND_URL;
const clientId = 'MQTT.Client'
const email = 'MQTT.Client.MockData@evil.corp.mail'
const password = '123'

async function registerClient() {
  try {
    response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
      email: email,
      password: password
    }, {
      headers: {
        'Client': clientId,
        'Content-Type': 'application/json',
      }
    });
    Logger.log(`successfully register client with message: ${response?.data?.message}`)
  } catch (err) {
    const message = err?.response?.data?.message || err.message;
    Logger.log(`failed to register request with message: ${message}`);
    throw err
  }
}

async function start() {
  const client = mqtt.connect(`ws://${HOST}:${PORT}`, {
    username: email,
    password: password,
    clientId: clientId,
    reconnectPeriod: 0,
  });

  client.on('connect', function () {
    Logger.log('connected to broker');
    client.publish('test/topic', 'Hello MQTT !', function () {
    });
    startPublishingMockData(client)
  });

  client.on('error', (err) => {
    Logger.logError(`${err}`);
    if (err.code === 135 || err.message.includes('Not authorized')) {
      client.end();
      registerClient()
        .then(() => {
          start();
        });
    }
  });
}

function startPublishingMockData(client) {
  setInterval(() => {
    publishMockData(client)
  }, 1000);
}

function publishMockData(client) {
  const esp32VoltageDataTopic = "a8667725-2cc4-4034-91d1-ff1190d4bf01";
  const esp32VoltageData = {
    data_type: "chart",
    data_value: {
      x: (Math.random() * 240).toFixed(2),
      y: new Date().toISOString(),
    },
  };

  const esp32PINStatusTopic = "ee8f371c-3dc2-4002-9f7a-2169ddb3500a";
  const esp32PINStatusData = {
    data_type: "boolean",
    data_value: {
      value: Math.random() < 0.5,
    }
  };

  client.publish(esp32VoltageDataTopic, JSON.stringify(esp32VoltageData));
  client.publish(esp32PINStatusTopic, JSON.stringify(esp32PINStatusData));
}

setTimeout(() => {
  start();
}, 2000);
