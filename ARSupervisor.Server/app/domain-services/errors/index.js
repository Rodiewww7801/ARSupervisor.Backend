const { DomainError } = require('../../domain/errors/index.js')

class PasswordHashError extends DomainError {}
class ValidationError extends DomainError {}
class UnsupportedClient extends DomainError {
	constructor() {
		super('Unsupported client')
	}
}

module.exports = {
	PasswordHashError,
	ValidationError,
	UnsupportedClient,
}