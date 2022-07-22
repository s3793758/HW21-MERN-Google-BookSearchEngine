const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: String!
    authors: [String!]!
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book!]
  }

  type Auth {
    user: User!
    token: String!
  }
  type Query {
    name: String!
    me: User!
  }

  type Mutation {
    addUser: (username: String!, email:String!, password: String): Auth!
    login(email: String!, password: String!): Auth!
    saveBook()
  }
`;

module.exports = { typeDefs };
