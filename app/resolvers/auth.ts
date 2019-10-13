import { transaction } from 'objection';
import { ApolloError, ValidationError, IResolvers } from 'apollo-server-express';
import * as Users from '../services/Users';
import * as Auth from '../services/Auth';
import RefreshToken from '../models/RefreshToken';
import { TOKEN_EXPIRE } from '../constants';

export const resolvers: IResolvers = {
  Mutation: {
    register: async (_, data, { models: { User } }) => {
      const { email } = data;
      const existingUser = await Users.getUserBy('email', email);

      if (existingUser) {
        return new ApolloError('There is user with such email.', '412');
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
        return new ApolloError(e.message || e, '422');
      }
    },
    login: async (_, data) => {
      const { email, password } = data;

      console.log(email);
      console.log(password);

      try {
        const user = await Users.getUserBy('email', email);

        if (!user) {
          return new ApolloError('There is no user with such email.', '400');
        }

        await Auth.validatePassword(password, user.passwordHash);

        return {
          ...user,
          ...Auth.getTokens(user),
        };
      } catch (e) {
        return new ValidationError(e.message || e);
      }
    },
    token: async (_, data) => {
      const { refreshToken } = data;

      const refreshTokenModel = await RefreshToken.query()
        .where({ value: refreshToken })
        .first();

      if (!refreshTokenModel) {
        return new ApolloError('There is no such refresh token');
      }
      const currentDate = new Date();
      const tokenTime = new Date(refreshTokenModel.createdAt);

      if (!(currentDate.getTime() - tokenTime.getTime() < TOKEN_EXPIRE)) {
        return new ApolloError('Refresh token has been expired');
      }

      const user = await Users.getUserBy('id', refreshTokenModel.userId);
      if (!user) {
        return new ApolloError('There is no user with such email.', '400');
      }
      await RefreshToken.query().deleteById(refreshTokenModel.id);

      return Auth.getTokens(user);
    },
  },
};

export default resolvers;
