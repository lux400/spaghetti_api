import { combineResolvers } from 'graphql-resolvers';
import { ValidationError } from 'apollo-server-express';
import * as Users from '../services/Users';
import { isAuthenticated } from '../services/Auth';

export default {
  Query: {
    users: combineResolvers(isAuthenticated, (parent, data, { dataSources }) =>
      dataSources.users.getUsers(),
    ),

    me: combineResolvers((_, __, { req }) =>
      Users.getUserBy('id', req.session.user.id),
    ),
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
