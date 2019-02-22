import bcrypt from 'bcrypt';
import User from './models/User';

export const resolvers = {
  Query: {
    hello: () => 'hi',

    users: async () => User.query(),
  },

  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return User.query()
        .insert({
          email,
          password_hash: hashedPassword,
          status_key: 'active',
        })
        .returning('*');
    },
  },
};
