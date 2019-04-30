const userRole = require('./data/user_roles');

exports.seed = (knex) =>
  knex('user_role')
    .del()
    .then(() => knex('user_role').insert(userRole));
