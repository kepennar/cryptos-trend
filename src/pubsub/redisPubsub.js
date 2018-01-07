const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis');
const redisConfig = require('../config').get('server');

module.exports = () => {
  const options = {
    host: redisConfig.host,
    port: redisConfig.port,
    retry_strategy: options => Math.max(options.attempt * 100, 3000) // reconnect after
  };

  return new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
  });
};
