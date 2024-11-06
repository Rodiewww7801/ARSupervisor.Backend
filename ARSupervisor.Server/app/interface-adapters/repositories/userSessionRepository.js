const { DatabaseError } = require('../errors/index.js');
const db = require('../../database/database.js');
const knex = db.knex

function repository() {
	async function addUserSession(accessToken, refreshToken, clientId, userId, isRevoked) {
		try {
			return await knex('userSessions')
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

	async function getUserSessionByAccessToken(accessToken) {
		try {
			return await knex('userSession')
				.where({
					accessToken: accessToken
				})
				.returning('*')
				.then(rows => rows[0]);
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	async function getUserSessionByRefreshToken(refreshToken) {
		try {
			return await knex('userSessions')
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
		addUserSession,
		getUserSessionByAccessToken,
		getUserSessionByRefreshToken
	})
}

module.exports = repository();
