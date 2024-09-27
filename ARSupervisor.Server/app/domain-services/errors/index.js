const { DomainError } = require('../../domain/errors/index.js')

class PasswordHashError extends DomainError {}
class ValidationError extends DomainError {}

module.exports = {
	PasswordHashError,
	ValidationError,
}