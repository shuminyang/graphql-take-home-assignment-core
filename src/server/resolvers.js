/**
 * This file is used to setup all resolvers
 */
const { getProperties } = require("../simplyRets/resolvers");

const resolvers = { Query: { getProperties } };

module.exports = {
  resolvers,
};
