const httpHelper = require('../../helpers/httpHelpers.js');
const { ValidationError, AuthenticationError, HTTPError } = require('../errors/index.js');
const { UserSession } = require('../../domain/index.js')

function handleError(err, res) {
	if(err instanceof HTTPError) {
		const statusCode = err.statusCode ;
		res.status(statusCode).json({message: err.message });
	} else {
		res.status(404).json({ message: 'Invalid request'});
	}
}

async function auth (req, res, next) {
	try {
		let accessToken = req.cookie?.accessToken || httpHelper.getAccessTokenFromHeader(req);
		if (!accessToken) {
			throw new ValidationError(401, 'Access token required');
		}
		try {
			const decodedJWT = await UserSession.verifyTokenSign(accessToken);
			if (!decodedJWT) {
				throw new AuthenticationError()
			}
			next()
		} catch(err) {
			throw new AuthenticationError()
		}
	} catch (err) {
		handleError(err, res);
	}
};

module.exports = auth;
