import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: '0.0.0.0',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: { min: 0, max: 7 },
  },
  staging: {
    client: 'pg',
    connection: {
      host: '0.0.0.0',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: { min: 0, max: 7 },
  },

  production: {
    client: 'pg',
    connection: {
      host: '0.0.0.0',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: { min: 0, max: 7 },
  },
};

module.exports = config;
