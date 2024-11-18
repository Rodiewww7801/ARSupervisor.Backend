/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('assets', function (table) {
      table.string('id', 50)
        .primary();
      table.string('name', 255);
      table.string('description', 255);
      table.string('measurement_unit', 255);
    })
    .createTable('assetsSessions', function (table) {
      table.string('id', 50)
        .primary();
      table.string('ownerId', 50)
        .notNullable();
      table.foreign('ownerId')
        .references('id')
        .inTable('users');
    })
    .createTable('assets_assetsSessions', function (table) {
      table.string('assetId', 50)
        .notNullable()
        .unique();
      table.foreign('assetId')
        .references('id')
        .inTable('assets');
      table.string('assetsSessionId', 50)
        .notNullable()
        .unique();
      table.foreign('assetsSessionId')
        .references('id')
        .inTable('assetsSessions');
      table.primary(['assetId', 'assetsSessionId']);
      table.float('xCoord')
      table.float('yCoord')
      table.float('zCoord')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('assets')
    .dropTable('assetsSessions')
    .dropTable('assets_assetsSessions')
};
