import { combineResolvers } from 'graphql-resolvers';
import { IResolvers } from 'apollo-server-express';
import * as Users from '../services/Users';
import User from '../models/User';
import { isAuthenticated } from '../services/Auth';

const resolvers: IResolvers = {
  Query: {
    users: combineResolvers((parent, args, { models: { User } }) =>
      User.query(),
    ),
    user: combineResolvers(isAuthenticated, (parent, args) =>
      Users.getUserBy('id', args.id),
    ),
    me: combineResolvers(isAuthenticated, (_, __, { req }: any) =>
      Users.getUserBy('id', req.session.user.id),
    ),
  },

  Mutation: {
    updateUser: combineResolvers(isAuthenticated, (parent, { id, ...user }) =>
      Users.updateUser(id, user as User),
    ),
  },
};

export default resolvers;
