import jwt from 'jsonwebtoken';
import randToken from 'rand-token';
import bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';
import RefreshToken from '../models/RefreshToken';
import config from '../config';

const getJWTUserModel = (user) => ({
  roleKey: user.roleKey,
  email: user.email,
  id: user.id,
});

export const isAuthenticated = (parent, data, { user }) =>
  user.id ? skip : new ApolloError(user);

export const getUserByToken = async (token) =>
  jwt.verify(token, config.secret, (err, decoded) => decoded || err.message);

const getJWT = (user) => {
  const jwtUserModel = getJWTUserModel(user);
  return jwt.sign(jwtUserModel, config.secret, { expiresIn: 300 });
};

const createRefreshToken = async (id) => {
  const refreshToken = randToken.uid(255);

  await RefreshToken.query().insert({ value: refreshToken, userId: id });

  return refreshToken;
};
export const getTokens = (user) => ({
  token: getJWT(user),
  refreshToken: createRefreshToken(user.id),
});

export const validatePassword = (password, passwordHash) =>
  bcrypt.compare(password, passwordHash).then((valid) => {
    if (!valid) {
      throw new Error('Invalid password');
    }
  });
