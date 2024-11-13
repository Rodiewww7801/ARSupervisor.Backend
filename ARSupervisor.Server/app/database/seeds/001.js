/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('assets').insert({
    id: "a8667725-2cc4-4034-91d1-ff1190d4bf01",
    name: "Voltage on ESP32",
    measurement_unit: "V",
  })
  await knex('assets').insert({
    id: "ee8f371c-3dc2-4002-9f7a-2169ddb3500a",
    name: "ESP32 PIN status",
  })
  await knex('assets').insert({
    id: "e379eb0f-d6a0-4893-b576-395843368b50",
    name: "ESP32 last data received",
  })
};
