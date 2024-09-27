const { DatabaseError } = require('../../errors/index.js');
const db = require('../../../database/database.js');
const knex = db.knex

function repository() {
	async function addRole(userId, role) {
		try {
			return await knex('roles')
				.insert({
					userId: userId,
					role: role
				})
				.onConflict('userId')
				.merge()
				.returning('*')
				.then(rows => rows[0]);
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	async function getRoleById(userId) {
		try {
			return await knex('roles')
				.where({
					userId: userId
				})
				.returning('*')
				.then(rows => rows[0]);
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	return Object.freeze({
		addRole,
		getRoleById
	})
}

module.exports = repository();