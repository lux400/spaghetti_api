import { Base } from '.';
import { Role } from '../enums/role';

export default class User extends Base {
  static tableName = 'users';
  static hidden = ['passwordHash', 'confirmationCode'];
  id: number;
  passwordHash: string;
  password: string;
  email: string;
  confirmationCode: string;
  statusKey: string;
  roleKey: Role;
}
