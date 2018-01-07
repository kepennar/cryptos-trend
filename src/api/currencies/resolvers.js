const { withFilter } = require('graphql-subscriptions');

const pubsub = require('../../pubsub')();
const { gdaxApi } = require('../../services');
const { productModel } = require('../../db/model');

module.exports = {
  Query: {
    async getCurrencies() {
      return await gdaxApi.listCurrencies();
    },
    async getTrades(root, { fromCoin, toCoin }) {
      return await gdaxApi.getCoinTrades(fromCoin, toCoin);
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
