const config = require('../config');
const redisPubsub = require('./redisPubsub');
const simplePubsub = require('./simplePubsub');

const pubsubMode = config.get('subscription').mode;

module.exports = () =>
  pubsubMode === 'redis' ? redisPubsub() : simplePubsub();
