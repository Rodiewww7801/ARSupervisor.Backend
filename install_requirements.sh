#!/bin/bash

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node@20
brew install postgresql@15
brew services start postgresql@15

npm install --prefix ARSupervisor.Server
npm install --prefix ARSupervisor.MQTT/Broker
npm install --prefix ARSupervisor.MQTT/Client.MockData
