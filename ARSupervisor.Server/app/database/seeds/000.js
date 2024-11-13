/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('clients').insert({
    id: 'ARSupervisor.IOS',
    secret: 'ARSupervisor.IOS',
    label: 'ARSupervisor.IOS',
    grants: ['password'],
  });
  await knex('clients').insert({
    id: 'Postman',
    secret: 'Postman',
    label: 'Postman',
    grants: ['password'],
  });
  await knex('clients').insert({
    id: 'MQTT.Client',
    secret: 'MQTT.Client',
    label: 'MQTT.Client',
    grants: ['client_credentials'],
  });
}
