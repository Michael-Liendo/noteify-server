import { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('notes', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('user_id').unsigned().references('users.id').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notes');
};
