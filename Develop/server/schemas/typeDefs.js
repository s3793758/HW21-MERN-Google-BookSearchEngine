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
    password: String!
    savedBooks: [Book!]
  }

  type Auth {
    user: User!
    token: String!
  }
  type Query {
    me: User!
  }

  input BookInput {
    bookId: String!
    authors: [String!]!
    description: String!
    title: String!
    image: String!
    link: String!
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth!
    login(email: String!, password: String!): Auth!
    saveBook(book: BookInput!): User!
    deleteBook(bookId: ID!): User!
  }
`;

module.exports = { typeDefs };
