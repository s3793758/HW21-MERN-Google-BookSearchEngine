const { AuthenticationError } = require('apollo-server-express');
const { Books, User } = require('../models/');

const resolvers = {
  Query: {
    name: () => 'Hello',
    me: (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }

      return new AuthenticationError('Please login to authenticate');
    },
  },
};

module.exports = { resolvers };
