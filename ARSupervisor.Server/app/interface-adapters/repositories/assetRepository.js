const { DatabaseError } = require('../errors/index.js');
const db = require('../../database/database.js');
const knex = db.knex

function repository() {
  async function addAsset(id, name, description, measurement_unit) {
    try {
      console.log(`hello ${id}`);
      return await knex('assets')
        .insert({
          id: id,
          name: name || null,
          description: description || null,
          measurement_unit: measurement_unit || null
        })
        .onConflict(['id'])
        .merge()
        .returning('*')
        .then(rows => rows[0]);
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  async function getAssetById(id) {
    try {
      return await knex('assets')
        .where({
          id: id,
        })
        .returning('*')
        .then(rows => rows[0]);
    } catch (err) {
      throw DatabaseError(err)
    }
  }

  async function getAssets(offset, limit) {
    try {
      const [assets, total] = await Promise.all([
        knex('assets')
          .select('*')
          .limit(limit)
          .offset(offset),
        knex('assets')
          .count('id as total')
          .first()
      ]);
      return [assets, total];
    } catch (err) {
      throw DatabaseError(err)
    }
  }

  return Object.freeze({
    addAsset,
    getAssetById,
    getAssets,
  });
}

module.exports = repository();

