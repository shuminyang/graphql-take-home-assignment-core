const { addResolversToSchema } = require("@graphql-tools/schema");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");

const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
const { SimplyRetsAPI } = require("../simplyRets/datasource");

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const createApolloServer = () => {
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    dataSources: () => {
      return {
        simplyRetsAPI: new SimplyRetsAPI(),
      };
    },
    /**
     * As there was no specific requirement to implement authorization in a certain way,
     * I decided to do per context to simplify the solution, but per resolver is also possible.
     */
    context: ({ req }) => {
      const token = req.headers.authorization || "";

      /**
       * Ideally we just want to grab this part of the token "676cfd34-e706-4cce-87ca-97f947c43bd4" without the bearer, validate and then return a valid user.
       * However to simplify the solution I'm just checking the entire string, but this is not ideal.
       */
      if (token !== "bearer 676cfd34-e706-4cce-87ca-97f947c43bd4") {
        throw new AuthenticationError("unauthorized");
      }

      return {
        email: "user1@sideinc.com",
      };
    },
  });

  return server;
};

module.exports = {
  createApolloServer,
};
