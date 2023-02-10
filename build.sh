#!/bin/bash

# Install dependencies
npm install

# Start the node app with nodemon
nodemon server.js | bunyan -o short

# Wait for the node app to start
sleep 5

# Run the sequelize migration
npx sequelize db:migrate

