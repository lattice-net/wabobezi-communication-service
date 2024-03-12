#!/bin/bash

APP_NAME="wabobezi-communication-service"
IS_EXISTS=$(pm2 describe "$APP_NAME" 2>/dev/null | grep 'online')

if [ "${IS_EXISTS}" == "" ]; then
  echo "The application does not exists, creating it but not starting"

  APPLICATION_PATH="/var/www/html/wabobezi/communication/dist"

  pm2 start ${APPLICATION_PATH}/main.js --name "$APP_NAME" --no-autorestart
  pm2 stop "$APP_NAME"
else
  echo "The application is running, stopping it"
  pm2 stop "$APP_NAME"
fi

pm2 save