const { withFilter } = require('graphql-subscriptions');

const pubsub = require('../../pubsub')();
const { listCurrencies, getCoinTrades } = require('./gdaxApi');

module.exports = {
  Query: {
    async getCurrencies() {
      return await listCurrencies();
    },
    async getTrades(root, { fromCoin, toCoin }) {
      return await getCoinTrades(fromCoin, toCoin);
    }
  },
  Subscription: {
    getCurrencies: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('newQuote'),
        (payload, variables) => payload.realtime.symbol === variables.symbol
      )
    }
  }
};
