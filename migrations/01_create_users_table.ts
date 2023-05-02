import { Knex } from 'knex';
exports.up = async (knex: Knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('full_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users');
};
