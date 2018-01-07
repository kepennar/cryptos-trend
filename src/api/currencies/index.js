const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const scalars = require('./scalars');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: { ...resolvers, ...scalars }
});
