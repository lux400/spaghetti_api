import { Model } from 'objection';
import * as Knex from 'knex';
import { knexConfig } from '../../knexfile';
import config from '../config';

export { default as Base } from './Base';
export { default as User } from './User';

export const knex = Knex(knexConfig[config.env]);

Model.knex(knex);
