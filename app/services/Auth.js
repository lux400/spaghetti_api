import jwt from 'jsonwebtoken';
import randToken from 'rand-token';
import config from '../config';
import bcrypt from 'bcrypt';
import RefreshToken from '../models/RefreshToken';

const getJWTUserModel = (user) => ({
  roleKey: user.roleKey,
  email: user.email,
  id: user.id,
});

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
