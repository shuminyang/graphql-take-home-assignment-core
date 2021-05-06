Please read the PLEASE_READ_FIRST.md first.

Please document your code & design decisions here.

## Libraries

### Dependencies
A couple of dependencies were added in order to develop the feature using good practices, one of them is `apollo-datasource-rest` to set up datasources and handle REST Api calls. `graphql` was also added to create a GraphQL server. `graphql-tools` was added to create Schema first concept and using the schema as source of truth.

### Development
A few dev dependencies were added in order to facilitate development, tools such as `nodemon` to enable hot-reloading so that we don't have to stop and start the server on every change. `faker` and `supertest` were added to handle integration tests.

## Code Desing
The project was kept fairly simple. In a production situation, I would use a library such as [NestJS](https://nestjs.com/), since it have some good practices there, authentication, loggers, DI, GraphQL (Schema/Code first) are all already configured.
However that would make this challenge very easy, so to demonstrate good knowledge of the fundamentals, I decided not to use anything like that and keep things simple.
I tend to separate my folders by feature usually, so it follows this pattern


```
src
  | -- Feature A
    | -- tests
      | -- integration.spec.js
      | -- unit.test.spec.js
    | -- resolvers.js
    | -- datasources.js
    | -- (any other file related to Feature A)
  | -- Feature B
    | -- tests
        | -- integration.spec.js
        | -- unit.test.spec.js
    | -- resolvers.js
    | -- datasources.js
    | -- (any other file related to Feature A)
  | -- Server
```

Security-wise, as asked in the `PLEASE_READ_FIRST.md` the endpoint should be protected by HTTP authentication, where it was given an e-mail and some sort of UUID, I would add passport.js to allow multiple types of authentication.

## Testing
Code coverage achieved is 100% as shown in the following picture:

<img src="https://i.imgur.com/ePvGS2u.png"/>

However there are two situations that was not covered, the first is when API returns 5xx, since I couldn't find a good way to understand what I should do when 5xx is returned I just expected the response from graphQL to be `null`. Second one is when API returns 4xx, as described before, I expected the return from graphQL to be `null`.