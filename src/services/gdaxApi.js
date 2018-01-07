const Gdax = require('gdax');
const { Subject } = require('rxjs/Subject');
const { createError } = require('apollo-errors');

const publicClient = new Gdax.PublicClient();

const ApiError = createError('Third party api error', {
  message: 'An error occured requesting GDAX API'
});

const listCurrencies = async () => {
  try {
    return await publicClient.getCurrencies();
  } catch (error) {
    throw new ApiError({ data: error });
  }
};

const listProducts = async () => {
  try {
    return await publicClient.getProducts();
  } catch (error) {
    throw new ApiError({ data: error });
  }
};

const getCoinTrades = async (fromCurrency, toCurrency) => {
  try {
    return await publicClient.getProductTrades(`${fromCurrency}-${toCurrency}`);
  } catch (error) {
    throw new ApiError({ data: error });
  }
};

function connectStream(products, stream) {
  const websocket = new Gdax.WebsocketClient(products);

  websocket.on('message', data => {
    stream.next({ data });
  });
  websocket.on('error', err => {
    console.log('[WS] get error', err);
  });
  websocket.on('close', () => {
    connectStream(products, stream);
  });
}

/**
 * Subscribe to channel
 {"type": "received",
    "time": "2014-11-07T08:19:27.028459Z",
    "product_id": "BTC-USD",
    "sequence": 10,
    "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
    "size": "1.34",
    "price": "502.1",
    "side": "buy",
    "order_type": "limit"
}
 * 
 */
const getStream = (products = ['BTC-USD', 'ETH-USD', 'LTC-USD']) => {
  const stream = new Subject();
  connectStream(products, stream);
  return stream;
};

module.exports = {
  listCurrencies,
  getCoinTrades,
  getStream
};
