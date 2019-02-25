import bcrypt from 'bcrypt';
import { User } from '../models';

export const validatePassword = (password, passwordHash) =>
  bcrypt.compare(password, passwordHash).then((valid) => {
    if (!valid) {
      throw new Error('Invalid password');
    }
  });

export const logoutUserEverywhere = (user) =>
  User.query()
    .from('sessions')
    .whereRaw(`(sess#>>'{user,id}')::integer = ${user.id}`)
    .delete();
