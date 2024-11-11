const { DatabaseError } = require('../interface-adapters/errors/index.js');
const LoggerObj = require('../../../CustomLogger/Logger.js');
const Logger = new LoggerObj('Database');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);

const createDatabaseIfNeeded = async function () {
  const _knexConfig = require('./knexfile');
  const databaseName = _knexConfig.connection.database;
  _knexConfig.connection.database = "postgres";
  const _knex = require('knex')(_knexConfig);
  try {
    const result = await _knex.raw(`SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`);
    if (result.rows.length === 0) {
      Logger.log(`${databaseName} not found, creating...`);
      await _knex.raw(`CREATE DATABASE ${databaseName}`);
      await runMigrations();
      await knex.seed.run();
      Logger.log(`${databaseName} created successfully.`);
    } else {
      await runMigrations();
    }
  } catch (err) {
    throw new DatabaseError(err.message);
  } finally {
    await _knex.destroy();
  }
}

async function runMigrations() {
  try {
    Logger.log(`Running migrations...`);
    await knex.migrate.latest();
    Logger.log(`Migrations completed successfully.`);
  } catch (err) {
    throw new DatabaseError(err.message);
  }
}

createDatabaseIfNeeded();

exports.knex = knex;
