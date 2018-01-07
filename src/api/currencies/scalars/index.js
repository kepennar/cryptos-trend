const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const setHours = require('date-fns/set_hours');
const setMinutes = require('date-fns/set_minutes');
const setSeconds = require('date-fns/add_seconds');

module.exports = {
  Time: new GraphQLScalarType({
    name: 'Time',
    description: 'Date custom scalar type',
    parseValue(value) {
      return parse(value); // value from the client
    },
    serialize(value) {
      const splitted = value
        .replace('PM', '')
        .replace('AM', '')
        .trim()
        .split(':')
        .map(v => parseInt(v, 10));
      const now = Date.now();
      const dateTime = setSeconds(
        setMinutes(setHours(now, splitted[0]), splitted[1]),
        splitted[2]
      );
      return dateTime.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  })
};
