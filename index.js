const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { addResolversToSchema } = require("@graphql-tools/schema");

const { SimplyRetsAPI } = require("./src/simplyRets/datasource");
const { resolvers } = require("./src/server/resolvers");
const { schema } = require("./src/server/schema");

const app = express();

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => {
    return {
      simplyRetsAPI: new SimplyRetsAPI(),
    };
  },
  context: ({ req }) => {
    const token = req.headers.authorization || "";

    if (token !== "bearer 676cfd34-e706-4cce-87ca-97f947c43bd4") {
      throw new AuthenticationError("unauthorized");
    }

    return {
      email: "user1@sideinc.com",
    };
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 4000 }, () =>
  console.log(`Listening on http://localhost:4000/graphql`)
);
