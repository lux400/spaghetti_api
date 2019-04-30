const userStatus = require('./data/user_status');

exports.seed = (knex) =>
  knex('user_status')
    .del()
    .then(() => knex('user_status').insert(userStatus));
