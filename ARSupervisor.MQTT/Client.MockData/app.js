const config = require('./config.js');

const axios = require('axios');
const mqtt = require('mqtt');
const HOST = config.BROKER_HOST;
const PORT = config.BROKER_PORT;
const BACKEND_URL = config.BACKEND_URL;
const clientId = 'MQTT.Client.MockData'
const email = 'MQTT.Client.MockData@evil.corp.mail'
const password = '123'

async function registerClient() {
  try {
    response =  await axios.post(`${BACKEND_URL}/api/authentication/register`, {
      email: email,
      password: password
    });
    console.log(`MQTT.Client.MockData:\t successfully register client with message: ${response?.data?.message}`)
  } catch (err) {
    const message = err?.response?.data?.message || err.message;
    console.log('MQTT.Client.MockData:\t failed to register request with message: ', message);
    throw err
  }
}

async function loginClient() {
  try {
    response =  await axios.post(`${BACKEND_URL}/api/authentication/login`, {
      email: email,
      password: password
    });
    console.log(`MQTT.Client.MockData:\t successfully login client with message: ${response?.data?.message}`)
  } catch (err) {
    const message = err?.response?.data?.message || err.message;
    console.log('MQTT.Client.MockData:\t failed to login request with message: ', message);
    throw err
  }
}

async function start() {
  try {
    await loginClient();
  } catch {
    console.log(`MQTT.Client.MockData:\t try to register client '${clientId}'`);
    try {
      await registerClient();
      await loginClient();
    } catch {
      console.log(`MQTT.Client.MockData:\t failed to authentifacate client '${clientId} execute with error'`);
      return 
    }
  }
  const client = mqtt.connect(`ws://${HOST}:${PORT}`, {
    username: email,
    password: password,
    clientId: clientId,
  });

  client.on('connect', function () {
    console.log('MQTT.Client.MockData:\t connected to broker');
    client.publish('test/topic', 'Hello MQTT !', function () {
      //client.end(); // Close the connection
    });
  });
}

setTimeout( () => {
  start();
}, 2000);