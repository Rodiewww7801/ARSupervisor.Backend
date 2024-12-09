/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('userImages', function (table) {
      table.string('id', 50)
        .primary();
      table.binary('image');
      table.string('mimetype', 50);
      table.string('userId', 50)
        .unique()
        .notNullable();
      table.foreign('userId')
        .references('id')
        .inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('user_images');
};
