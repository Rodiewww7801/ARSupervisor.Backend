/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('clients', function (table) {
      table.string('id', 50)
        .notNullable()
        .primary();
      table.string('secret', 255)
        .notNullable();
      table.string('label', 255)
        .notNullable();
      table.specificType('grants', 'TEXT[]');
    })
    .createTable('users', function (table) {
      table.string('id', 50)
        .notNullable()
        .primary();
      table.string('email', 255)
        .notNullable();
      table.string('hashedPassword', 255);
    })
    .createTable('userSessions', function (table) {
      table.string('accessToken', 255)
        .notNullable()
        .unique();
      table.string('refreshToken', 255)
        .notNullable()
        .unique();
      table.primary(['accessToken', 'refreshToken']);
      table.string('clientId', 50)
        .notNullable()
      table.foreign('clientId')
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE');
      table.string('userId', 50)
        .notNullable()
      table.foreign('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.boolean('isRevoked')
        .notNullable()
        .defaultTo(false)
    })
    .createTable('roles', function (table) {
      table.string('userId', 50)
        .primary();
      table.foreign('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('role', 255)
        .notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('clients')
    .dropTable('users')
    .dropTable('accessTokens')
    .dropTable('refreshTokens')
    .dropTable('userSessions')
    .dropTable('roles');
};

exports.seed = async function (knex) {
  await knex('clients').insert({
    id: crypto.randomUUID().toString(),
    secret: 'ARSupervisor.IOS',
    label: 'ARSupervisor.IOS',
    grants: ['password'],
  });
  await knex('clients').insert({
    id: crypto.randomUUID().toString(),
    secret: 'Postman',
    label: 'Postman',
    grants: ['password'],
  });
  await knex('clients').insert({
    id: crypto.randomUUID().toString(),
    secret: 'MQTT.Client',
    label: 'MQTT.Client',
    grants: ['client_credentials'],
  });
}
