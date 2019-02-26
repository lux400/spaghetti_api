import { combineResolvers } from 'graphql-resolvers';
import { ValidationError } from 'apollo-server-express';
import * as Users from '../services/Users';

export default {
  Query: {
    users: combineResolvers((parent, data, { models: { User } }) => User.query()),
    me: combineResolvers((_, __, { req }) => Users.getUserBy('id', req.session.user.id)),
  },

  Mutation: {
    updateUser: combineResolvers(async (parent, { id, ...data }) => {
      const updatedUser = await Users.updateUser(id, data);
      if (!updatedUser) {
        return new ValidationError('There is no such user');
      }
      return updatedUser;
    }),
  },
};
