class DomainError extends Error {
	constructor(message) {
		super(message);
	}
}

class UserAllreadyExist extends DomainError {
	constructor(username) {
		super(`User '${username}' allready exist`);
		this.username = username;
	}
 }

module.exports = {
	DomainError,
	UserAllreadyExist
};