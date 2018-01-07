FROM node:8 as server

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/src/app
COPY package.json .

RUN npm install --production

COPY ecosystem.config.js .
COPY src src

ENV NB_NODES=2

CMD ["node_modules/.bin/pm2-docker", "start", "--auto-exit", "ecosystem.config.js"]
