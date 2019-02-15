exports.up = (knex) =>
  knex.schema.createTable('user_role', (table) => {
    table.string('key').primary();
    table.string('name');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('user_role');
