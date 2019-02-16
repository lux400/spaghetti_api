import _ from 'lodash';
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import { transaction } from 'objection';

import { User } from '../models';
import { ROLE_USER, STATUS_UNCONFIRMED } from '../constants';

const saltRounds = 10;

export const encryptPassword = (password) => bcrypt.hash(password, saltRounds);

export const validatePassword = (password, passwordHash) =>
  bcrypt.compare(password, passwordHash).then((valid) => {
    if (!valid) {
      throw new Error('invalid password');
    }
  });

export const listUsers = () => User.query();

export const getUserBy = (field, value) =>
  User.query()
    .where(field, value)
    .first();

export const updateUser = (id, data) => User.query().patchAndFetchById(id, data);

const preparePassword = async (password) => ({
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

export const createUser = async ({ userData }) => {
  const trx = await transaction.start(User.knex());

  try {
    const preparedUser = await prepareUserForRegistration(userData);
    const user = await User.query(trx)
      .insert(preparedUser)
      .returning('*');

    await trx.commit();

    return user;
  } catch (e) {
    await trx.rollback(e);
    throw e;
  }
};

export const logoutUserEverywhere = (user) =>
  User.query()
    .from('sessions')
    .whereRaw(`(sess#>>'{user,id}')::integer = ${user.id}`)
    .delete();
