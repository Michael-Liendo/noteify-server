import knex from 'knex';

const database = knex({
  client: 'pg',
  connection: {
    host: '0.0.0.0',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  pool: { min: 0, max: 7 },
});

export default database;
