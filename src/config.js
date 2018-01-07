const convict = require('convict');
require('dotenv').config();

const config = convict({
  server: {
    port: {
      doc: 'server port',
      format: 'port',
      default: 3000,
      env: 'PORT'
    },
    wsPort: {
      doc: 'websocket server port',
      format: 'port',
      default: 3010,
      env: 'WS_PORT'
    }
  },
  log: {
    format: {
      doc: 'Log format',
      format: '*',
      default: 'access',
      env: 'LOG_FORMAT'
    }
  },
  redis: {
    host: {
      doc: 'Redis server host',
      format: '*',
      default: 'localhost',
      env: 'REDIS_HOST'
    },

    port: {
      doc: 'Redis server port',
      format: 'port',
      default: 6379,
      env: 'REDIS_PORT'
    }
  },
  subscription: {
    mode: {
      doc: 'Subscription pubsub mode',
      format: '*',
      default: 'simple',
      env: 'SUBSCRIPTION_MODE'
    }
  },
  gdax: {
    url: {
      doc: 'GDAX api url',
      format: 'url',
      default: 'https://api-public.sandbox.gdax.com'
    }
  }
});

config.validate({ allowed: 'strict' });
module.exports = config;
