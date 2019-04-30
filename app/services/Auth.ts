import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';
import RefreshToken from '../models/RefreshToken';
import User from '../models/User';
import config from '../config';

const getJWTUserModel = (user:User) => ({
  roleKey: user.roleKey,
  email: user.email,
  id: user.id,
});
export const isAuthenticated = (parent: any, data: any, { user }: { user: User }) =>
  user.id ? skip : new ApolloError('Not authenticated.');

export const getUserByToken = async (token: string) =>
  jwt.verify(token, config.secret, (err, decoded) => decoded || err.message);

const getJWT = (user: User) => {
  const jwtUserModel = getJWTUserModel(user);
  return jwt.sign(jwtUserModel, config.secret, { expiresIn: 300 });
};

const createRefreshToken = async (id: number) => {
  const refreshToken = crypto.randomBytes(255).toString('hex');

  await RefreshToken.query().insert({ value: refreshToken, userId: id });

  return refreshToken;
};
export const getTokens = (user: User) => ({
  token: getJWT(user),
  refreshToken: createRefreshToken(user.id),
});

export const validatePassword = (password: string, passwordHash: string) =>
  bcrypt.compare(password, passwordHash).then((valid) => {
    if (!valid) {
      throw new Error('Invalid password');
    }
  });
