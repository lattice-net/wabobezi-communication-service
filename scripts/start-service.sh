#!/bin/bash

APP_NAME="wabobezi-communication-service"
APPLICATION_ABSOLUTE_PATH="/var/www/html/wabobezi/communication"
NODE_VERSION="20"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm use $NODE_VERSION

# shellcheck disable=SC2164
cd ${APPLICATION_ABSOLUTE_PATH}
npm install
npm install @prisma/client
npx prisma migrate deploy

pm2 restart $APP_NAME
pm2 save