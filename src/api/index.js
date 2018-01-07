const { createServer } = require('http');
const Router = require('koa-router');
const { execute, subscribe } = require('graphql');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { formatError } = require('apollo-errors');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const config = require('../config');
const schema = require('./currencies');
const serverConfig = config.get('server');

const apiRouter = new Router();
apiRouter.post('/graphql', graphqlKoa({ formatError, schema }));
apiRouter.get('/graphql', graphqlKoa({ formatError, schema }));

const WS_GQL_PATH = '/subscriptions';
const WS_GQL_URL = `ws://localhost:${serverConfig.wsPort}${WS_GQL_PATH}`;

apiRouter.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql',
    subscriptionsEndpoint: WS_GQL_URL,
    query: `
    query {
      getCurrencies {
        id
        name
      }
    }
    `
  })
);

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening
websocketServer.listen(serverConfig.wsPort, () =>
  console.log(
    `Websocket Server is now running on http://localhost:${serverConfig.wsPort}`
  )
);

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    onConnect: () => {
      console.log('[DEBUG] connection');
    }
  },
  {
    server: websocketServer,
    path: WS_GQL_PATH
  }
);

module.exports = apiRouter;
