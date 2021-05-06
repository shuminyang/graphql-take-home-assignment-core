const { createApolloServer } = require("./src/server");
const express = require("express");

const createTestServer = () => {
  const app = express();
  const apollo = createApolloServer();
  apollo.applyMiddleware({ app });

  return app;
};

global.createTestServer = createTestServer;
