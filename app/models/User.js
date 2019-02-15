import { Base } from '.';

export default class User extends Base {
  static tableName = 'users';

  static hidden = ['passwordHash', 'confirmationCode'];
}
