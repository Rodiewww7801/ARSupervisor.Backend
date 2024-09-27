#!/bin/bash


npm start --prefix ARSupervisor.Server &
npm start --prefix ARSupervisor.MQTT/Broker &
npm start --prefix ARSupervisor.MQTT/Client.MockData &

wait

echo "Services are running"

