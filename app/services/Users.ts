import * as _ from 'lodash';
import * as uuidv4 from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import { ValidationError } from 'apollo-server-express';
import { User } from '../models';
import { Role, AccountStatus } from '../enums';

const saltRounds = 10;

export const getUserBy = async (field: string, value: string | number) => {
  return User.query()
    .where(field, value)
    .first();
};

export const updateUser = async (id: number, data: User) => {
  const updatedUser = await User.query().patchAndFetchById(id, data);
  const error = new ValidationError('There is no such user');
  return updatedUser || error;
};

export const encryptPassword = (password?: string) =>
  bcrypt.hash(password, saltRounds);

export const preparePassword = async (password?: string) => ({
  passwordHash: await encryptPassword(password),
  password: undefined,
});

export const prepareUserForRegistration = async (params: User) => {
  const user = _.pick(params, ['firstName', 'lastName', 'email', 'password']);
  Object.assign(user, await preparePassword(user.password));
  user.confirmationCode = uuidv4();
  user.statusKey = AccountStatus.UNCONFIRMED;
  user.roleKey = Role.USER;
  delete user.password;

  return user;
};
