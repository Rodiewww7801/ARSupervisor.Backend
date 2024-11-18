const { DatabaseError } = require('../errors/index.js');
const db = require('../../database/database.js');
const knex = db.knex

function repository() {
  async function createAssetsSession(id, ownerId) {
    try {
      return await knex('assetsSessions')
        .insert({
          id: id,
          ownerId: ownerId,
        })
        .onConflict(['id'])
        .merge()
        .returning('*')
        .then(rows => rows[0]);
    } catch (err) {
      throw new DatabaseError(err.message);
    }
  }

  async function addAsset(assetsSessionId, assetId) {
    try {
      return await knex('assets_assetsSessions')
        .insert({
          assetsSessionId: assetsSessionId,
          assetId: assetId,
        })
        .onConflict(['assetsSessionId', 'assetId'])
        .merge()
        .returning('*')
        .then(rows => rows[0]);
    } catch (err) {
      throw new DatabaseError(err.message);
    }
  }

  async function deleteAsset(assetsSessionId, assetId) {
    try {
      return await knex('assets_assetsSessions')
        .where({
          assetsSessionId: assetsSessionId,
          assetId: assetId,
        })
        .del();
    } catch (err) {
      throw new DatabaseError(err.message);
    }
  }


  async function getAssetsSessionById(assetsSessionId) {
    try {
      const rows = await knex('assetsSessions')
        .where({
          'assetsSessions.id': assetsSessionId,
        })
        .leftJoin('assets_assetsSessions', 'assets_assetsSessions.assetsSessionId', 'assetsSessions.id')
        .leftJoin('assets', 'assets.id', 'assets_assetsSessions.assetId')
        .select('*', 'assetsSessions.id', 'assets.id AS assetId')

      if (rows.length == 0) {
        return null
      }
      const assetsSession = rows[0];
      assetsSession.assets = [];
      rows.forEach((row) => {
        if (row.assetId) {
          assetsSession.assets.push({
            id: row.assetId,
            name: row.name || null,
            description: row.description || null,
            measurment_unit: row.measurement_unit || null,
          });
        }
      });
      return assetsSession;
    } catch (err) {
      throw new DatabaseError(err.message);
    }
  }

  return Object.freeze({
    createAssetsSession,
    addAsset,
    deleteAsset,
    getAssetsSessionById,
  });
}

module.exports = repository()
