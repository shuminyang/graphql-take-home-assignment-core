const express = require("express");
const { createApolloServer } = require("./src/server");

const main = (port) => {
  const app = express();
  const apolloServer = createApolloServer();

  // Please use apollo server to implement your graphql query

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () =>
    console.log(`Listening on http://localhost:4000/graphql`)
  );

  return app;
};

main();
