import { Knex } from 'knex';

exports.up = function (knex: Knex) {
  return knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('notes');
};
