#!/bin/bash

cd /var/www/heroes

# if [ ! -d /var/www/heroes/node_modules ]; then
  npm cache clean -f  &&  npm install
# fi;

npm run start:dev
