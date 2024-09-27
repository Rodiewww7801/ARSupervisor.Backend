// HTTP Errors
class HTTPError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

class AuthenticationError extends HTTPError {
	constructor() {
		super(401, 'Unauthorized')
	}
}

class AuthorizationError extends HTTPError {
	constructor() {
		super(403, 'Forbidden')
	}
}

class InvalidRequest extends HTTPError {
	constructor() {
		super(404, 'Invalid request')
	}
}

class ValidationError extends HTTPError {}

class MissingClientHeaderError extends ValidationError {
	constructor() {
		super(400, "'Client' header is not provided")
	}
}

// Database errors
class DatabaseError extends Error { }

module.exports = {
	HTTPError,
	AuthenticationError,
	AuthorizationError,
	InvalidRequest,
	ValidationError,
	MissingClientHeaderError,
	DatabaseError,
}