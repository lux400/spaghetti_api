exports.up = (knex) =>
  knex.schema.createTable('refresh_token', (t) => {
    t.increments('id').unsigned().primary();
    t.string('value').nullable();
    t.integer('user_id')
      .unsigned()
      .notNull()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    t.timestamps(true, true);
  });


exports.down = (knex) => knex.schema.dropTable('refresh_token');
