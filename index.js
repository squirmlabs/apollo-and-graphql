import express from 'express';

// GraphQL modules
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';

// Server environment variables
const PORT = process.env.PORT || 3000;

// Express Application
const app = express();

// Creating our GraphQL Schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

// Root has the methods we will execute to get the data
const root = {
  message: () => 'First message'
};

// GraphQL middleware
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    rootValue: root,
    graphiql: true // This enables the GraphQL browser's IDE
  })
);

// Running our server
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
