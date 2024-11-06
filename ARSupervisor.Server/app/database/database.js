const { DatabaseError } = require('../interface-adapters/errors/index.js');
const config = require('../config.js');
const LoggerObj = require('../../../CustomLogger/Logger.js');
const Logger = new LoggerObj('Database');
const connectionString = `postgresql://${config.DB_USER}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}?schema=public`

const knex = require('knex')({
	client: 'pg',
	connection: connectionString
});

const knexSystem = require('knex')({
	client: 'pg',
	connection: {
		host: config.DB_HOST,
		user: config.DB_USER,
		database: 'postgres'
	}
});

const dbName = config.DB_NAME;
const migrationConfig = {
	directory: __dirname + '/migrations',
}

const createDatabaseIfNeeded = async function (completion) {
	try {
		const result = await knexSystem.raw(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
		if (result.rows.length === 0) {
			Logger.log(`${dbName} not found, creating...`);
			await knexSystem.raw(`CREATE DATABASE ${dbName}`);
			Logger.log(`${dbName} created successfully.`);
		} else {
			Logger.log(`${dbName} already exists.`);
		}
		await runMigrations();
		completion();
	} catch (err) {
		throw new DatabaseError(err.message);
	} finally {
		await knexSystem.destroy();
	}
}

async function runMigrations() {
	try {
		Logger.log(`Running migrations on ${dbName}...`);
		await knex.migrate.latest(migrationConfig);
		Logger.log(`Migrations for ${dbName} completed successfully.`);
	} catch (err) {
		throw new DatabaseError(err.message);
	}
}


exports.knex = knex;
exports.knexSystem = knexSystem;
exports.connectionString = connectionString
exports.createDatabaseIfNeeded = createDatabaseIfNeeded;