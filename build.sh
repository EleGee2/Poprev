#!/bin/bash

# Install dependencies
npm install

# Start the node app with nodemon
nodemon server.js | bunyan -o short

# Wait for the node app to start
sleep 5

# Run the sequelize migrations
./node_modules/.bin/sequelize db:migrate

# Keep the script running so that the node app keeps running
while true; do
  sleep 1
done
