class DomainError extends Error {
	constructor(message) {
		super(message);
	}
}

class UserAllreadyExist extends DomainError {
	constructor(email) {
		super(`User '${email}' allready exist`);
		this.email = email;
	}
}

class UserDosentExist extends DomainError {
	constructor(email) {
		super(`User '${email}' dosen't exist`);
		this.email = email;
	}
}


module.exports = {
	DomainError,
	UserDosentExist,
	UserAllreadyExist
};