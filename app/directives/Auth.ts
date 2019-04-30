import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { FORBIDDEN, UNAUTHORIZED } from '../constants/messages/auth';

/* eslint-disable */

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    const { role } = this.args;

    field.resolve = async function resolver(...args: any[]) {
      const [, , ctx] = args;
      const { user } = ctx;

      if (user && user.id) {
        if (role && (!user.roleKey || !user.roleKey.includes(role))) {
          throw new AuthenticationError(FORBIDDEN);
        } else {
          return resolve.apply(this, args);
        }
      }

      throw new AuthenticationError(UNAUTHORIZED);
    };
  }
}

/* eslint-enable */
