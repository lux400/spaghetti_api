module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST || undefined,
      database: 'spaghetti_dev',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      direcrory: './seeds/dev',
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'spaghetti_test',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      direcrory: './seeds/dev',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
