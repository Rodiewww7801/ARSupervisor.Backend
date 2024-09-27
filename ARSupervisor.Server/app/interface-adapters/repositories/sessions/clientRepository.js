const { DatabaseError } = require('../../errors/index.js');
const db = require('../../../database/database.js');
const knex = db.knex

function repository() {
	async function  addClient(id, secret, label, grants) {
		if(!id) {
			id = crypto.randomUUID().toString();
		}
		try {
			return await knex('clients')
				.insert({
					id: id,
					secret: secret,
					label: label,
					grants: grants
				})
				.onConflict('id')
				.merge()
				.returning('*')
				.then(rows => rows[0]); 
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	async function getClientById(clientId) {
		try {
			return await knex('clients')
				.where({
					id: clientId
				})
				.returning('*')
				.then(rows => rows[0]); 
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	return Object.freeze({
		addClient,
		getClientById
	});
}
 
module.exports = repository();