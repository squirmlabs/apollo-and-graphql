import express from 'express';

// GraphQL modules
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';

// Contacts Data
import { contacts } from './data/contacts';

// Server environment variables
const PORT = process.env.PORT || 3000;

// Express Application
const app = express();

// Creating our GraphQL Schema
const schema = buildSchema(`
  type Query {
    contact(id: Int!): Contact
    contacts(name: String): [Contact]
  }

  type Contact {
    id: Int
    name: String
    phone: String
    email: String
  }
`);

// Data methods
const methods = {
  getContact: args => {
    const { id } = args;
    return contacts.filter(contact => contact.id === id)[0];
  },
  getContacts: args => {
    const { name = false } = args;
    // If we don't get a name we return all contacts
    if (!name) {
      return contacts;
    }
    // Returning contacts with same name...
    return contacts.filter(contact => contact.name.includes(name));
  }
};

// Root has the methods we will execute to get the data
const root = {
  contact: methods.getContact,
  contacts: methods.getContacts
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
