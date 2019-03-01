import { combineResolvers } from 'graphql-resolvers';
import * as Users from '../services/Users';
import { isAuthenticated } from '../services/Auth';

export default {
  Query: {
    users: combineResolvers((parent, args, { models: { User } }) =>
      User.query(),
    ),
    user: combineResolvers(isAuthenticated, (parent, args) =>
      Users.getUserBy('id', args.id),
    ),
    me: combineResolvers(isAuthenticated, (_, __, { req }) =>
      Users.getUserBy('id', req.session.user.id),
    ),
  },

  Mutation: {
    updateUser: combineResolvers(isAuthenticated, (parent, { id, ...data }) =>
      Users.updateUser(id, data),
    ),
  },
};
