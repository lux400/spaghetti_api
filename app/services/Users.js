import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import { ValidationError, ApolloError } from 'apollo-server-express';
import { ROLE_USER, STATUS_UNCONFIRMED } from '../constants';
import { User } from '../models';

const saltRounds = 10;

export const getUserBy = async (field, value) => {
  const user = await User.query()
    .where(field, value)
    .first();
  const error = new ApolloError(`There is no user with ${field} ${value}`);
  return user || error;
};

export const updateUser = async (id, data) => {
  const updatedUser = await User.query().patchAndFetchById(id, data);
  const error = new ValidationError('There is no such user');
  return updatedUser || error;
};

export const encryptPassword = (password) => bcrypt.hash(password, saltRounds);

export const preparePassword = async (password) => ({
  passwordHash: await encryptPassword(password),
  password: undefined,
});

export const prepareUserForRegistration = async (params) => {
  const user = _.pick(params, ['firstName', 'lastName', 'email', 'password']);
  Object.assign(user, await preparePassword(user.password));
  user.confirmationCode = uuidv4();
  user.statusKey = STATUS_UNCONFIRMED;
  user.roleKey = ROLE_USER;
  delete user.password;

  return user;
};
