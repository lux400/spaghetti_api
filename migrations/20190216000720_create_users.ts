exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id');
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('password_hash').notNullable();
    table.string('first_name');
    table.string('last_name');
    table
      .string('role_key')
      .references('key')
      .inTable('user_role')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table
      .string('status_key')
      .notNullable()
      .references('key')
      .inTable('user_status')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table.uuid('confirmation_code');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('users');
