const { DatabaseError } = require('../errors/index.js');
const db = require('../../database/database.js');
const knex = db.knex

function repository() {
  async function addUser(id, email, hashedPassword) {
    try {
      return await knex('users')
        .insert({
          id: id,
          email: email,
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

  async function getUserByEmail(email) {
    try {
      return await knex('users')
        .where({
          email: email,
        })
        .returning('*')
        .then(rows => rows[0]);
    } catch (err) {
      throw new DatabaseError(err.message);
    }
  }

  async function getUserById(id) {
    try {
      return await knex('users')
        .where({
          id: id,
        })
        .returning('*')
        .then(rows => rows[0]);
    } catch (err) {
      throw new DatabaseError(err.message);
    }
  }

  return Object.freeze({
    addUser,
    getUserByEmail,
    getUserById,
  })
}

module.exports = repository();
