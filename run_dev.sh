#!/bin/bash


npm run dev --prefix ARSupervisor.Server &
npm run dev --prefix ARSupervisor.MQTT/Broker &
npm run dev --prefix ARSupervisor.MQTT/Client.MockData &

wait

echo "Services run on 'dev' environment"
