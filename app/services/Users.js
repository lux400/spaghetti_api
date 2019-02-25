import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import { ROLE_USER, STATUS_UNCONFIRMED } from '../constants';
import { User } from '../models';

const saltRounds = 10;

export const getUserBy = (field, value) =>
  User.query()
    .where(field, value)
    .first();

export const updateUser = (id, data) => User.query().patchAndFetchById(id, data);

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