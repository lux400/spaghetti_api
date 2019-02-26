import path from 'path';

import { Base } from '.';

export default class RefreshToken extends Base {
  static tableName = 'refresh_token';

  // static get relationMappings() {
  //   return {
  //     Users: {
  //       relation: Base.BelongsToOneRelation,
  //       modelClass: path.join(__dirname, '/User'),
  //       join: {
  //         from: 'refresh_token.user_id',
  //         to: 'users.id'
  //       }
  //     }
  //   };
  // }
}
