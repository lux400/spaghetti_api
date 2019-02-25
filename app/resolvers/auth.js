import { transaction } from 'objection';
import { skip } from 'graphql-resolvers';
import { ApolloError, ValidationError, ForbiddenError } from 'apollo-server-express';
import * as Accounts from '../services/Accounts';
import * as Users from '../services/Users';

export const isAuthenticated = (parent, args, { req }) =>
  req.session.user ? skip : new ForbiddenError('Not authenticated as user.');

export default {
  Mutation: {
    register: async (_, data, { models: { User } }) => {
      const { email } = data;
      const existingUser = await Users.getUserBy('email', email).select('id');

      if (existingUser) {
        return new ApolloError('There is user with such email.', 412);
      }

      const trx = await transaction.start(User.knex());

      try {
        const preparedUser = await Users.prepareUserForRegistration(data);

        const user = await User.query(trx)
          .insert(preparedUser)
          .returning('*');

        await trx.commit();
        return user;
      } catch (e) {
        await trx.rollback(e);
        return new ApolloError(e.message || e, 422);
      }
    },

    login: async (_, data, { req }) => {
      const { email, password } = data;

      try {
        const user = await Users.getUserBy('email', email);

        if (!user) {
          return new ApolloError('There is no user with such email.', 400);
        }

        await Accounts.validatePassword(password, user.passwordHash);

        req.session.user = {
          id: user.id,
          type: user.type,
        };

        return user;
      } catch (e) {
        return new ValidationError(e.message || e);
      }
    },
  },
};
