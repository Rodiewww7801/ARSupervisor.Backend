/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
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
