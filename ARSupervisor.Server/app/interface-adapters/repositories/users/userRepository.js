const { DatabaseError } = require('../../errors/index.js');
const db = require('../../../database/database.js');
const knex = db.knex

function repository() {
	async function addUser(id, username, hashedPassword) {
		try {
			return await knex('users')
				.insert({
					id: id,
					username: username,
					hashedPassword: hashedPassword,
				})
				.onConflict('id')
				.merge()
				.returning('*')
				.then(rows => rows[0]); 
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	async function getUserByUsername(username) {
		try {
			return await knex('users')
				.where({
					username: username,
				})
				.returning('*')
				.then(rows => rows[0]); 
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	return Object.freeze({
		addUser,
		getUserByUsername
	})
}

module.exports = repository();