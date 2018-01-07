const typeDefs = `
scalar Time

type Currency {
  id: String
  name: String
  min_size: Float
  status: String
  message: String
}

type Trade {
  time: String
  trade_id: Int
  price: Float
  size: Float
  side: String
}

type Query {
  getCurrencies: [Currency]
  getTrades(fromCoin: String, toCoin: String): [Trade]
}

type Subscription {
  getCurrencies: [Currency]
}
`;

module.exports = typeDefs;
