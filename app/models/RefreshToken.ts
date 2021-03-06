import { Base } from '.';

export default class RefreshToken extends Base {
  static tableName = 'refresh_token';
  value: string;
  createdAt: string;
  userId: number;
  id: string;
}
