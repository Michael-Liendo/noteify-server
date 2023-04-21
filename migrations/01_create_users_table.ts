import { Knex } from 'knex';

exports.up = function (knex: Knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('full_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable('users');
};
