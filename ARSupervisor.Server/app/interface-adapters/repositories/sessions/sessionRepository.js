const { DatabaseError } = require('../../errors/index.js');
const db = require('../../../database/database.js');
const knex = db.knex

function repository() {
	async function addSession(accessToken, refreshToken, clientId, userId, isRevoked) {
		try {
			return await knex('sessions')
				.insert({
					accessToken: accessToken,
					refreshToken: refreshToken,
					clientId: clientId,
					userId: userId,
					isRevoked: isRevoked
				})
				.onConflict(['accessToken', 'refreshToken'])
				.merge()
				.returning('*')
				.then(rows => rows[0]);
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	async function getSessionByAccessToken(accessToken) {
		try {
			return await knex('sessions')
				.where({
					accessToken: accessToken
				})
				.returning('*')
				.then(rows => rows[0]);
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	async function getSessionByRefreshToken(refreshToken) {
		try {
			return await knex('sessions')
				.where({
					refreshToken: refreshToken
				})
				.returning('*')
				.then(rows => rows[0]);
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	return Object.freeze({
		addSession,
		getSessionByAccessToken,
		getSessionByRefreshToken
	})
}

module.exports = repository();