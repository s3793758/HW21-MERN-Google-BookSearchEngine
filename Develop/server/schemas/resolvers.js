const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const { signToken } = require('../utils/auth');
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById({ _id: context.user._id });
        return user;
      }

      return new AuthenticationError('Please login to authenticate');
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = new User({ username, email, password });
      await user.save();
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id,
      });
      return {
        user,
        token,
      };
    },
    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      console.log({ user });

      if (!user) {
        return new AuthenticationError('Invalid email');
      }

      const isMatchingPassword = user.isCorrectPassword(password);
      if (!isMatchingPassword) {
        return new AuthenticationError('Invalid password');
      }
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id,
      });
      console.log({ token });
      return {
        user,
        token,
      };
    },
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const user = User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: { savedBooks: book },
          },
          {
            new: true,
          }
        );
        return user;
      } else {
        return new AuthenticationError('Please login to authenticate');
      }
    },
  },
};

module.exports = { resolvers };
