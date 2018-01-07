const fetch = require('node-fetch');
const { createError } = require('apollo-errors');

const config = require('../../config');
const gdaxUrl = config.get('gdax').url;

const ApiError = createError('Third party api error', {
  message: 'An error occured requesting GDAX API'
});

const listCurrencies = async () => {
  const response = await fetch(`${gdaxUrl}/currencies`);
  if (response.status !== 200) {
    throw new ApiError({ data: { statusText: response.statusText } });
  }
  return response.json();
};

const listProducts = async () => {
  const response = await fetch(`${gdaxUrl}/products`);
  if (response.status !== 200) {
    throw new ApiError({ data: { statusText: response.statusText } });
  }
  return response.json();
};

const getCoinTrades = async (fromCurrency, toCurrency) => {
  const response = await fetch(
    `${gdaxUrl}/products/${fromCurrency}-${toCurrency}/trades`
  );
  if (response.status !== 200) {
    throw new ApiError({ data: { statusText: response.statusText } });
  }
  return response.json();
};

module.exports = {
  listCurrencies,
  getCoinTrades
};
