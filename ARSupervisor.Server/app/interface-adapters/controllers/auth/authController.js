const { UnsupportedClient } = require("../../../domain-services/errors/index.js");
const { UserAllreadyExist, UserDosentExist } = require("../../../domain/errors/index.js");
const { ValidationError, HTTPError } = require("../../errors/index.js");

function authController(sessionService) {
	function handleError(err, res) {
		if (err instanceof HTTPError) {
			const statusCode = err.statusCode;
			res.status(statusCode).json({ message: err.message });
		} else if (
			err instanceof UserAllreadyExist ||
			err instanceof UserDosentExist ||
		 	err instanceof UnsupportedClient) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(400).json({ message: 'Invalid request' });
		}
	}


	async function handleRegister(req, res) {
		try {
			const { email, password } = req.body;
			const clientId = req.header('Client');
			await sessionService.registerUser(email, password, clientId);
			res.status(200).json({ message: 'Registration is successfull' });
		} catch (err) {
			handleError(err, res)
		}
	}

	async function handleLogin(req, res) {
		try {
			const { email, password } = req.body;
			const clientId = req.header('Client');
			const session = await sessionService.loginUser(email, password, clientId);
			if (process.nativeApps.includes(session.clientId)) {
				res.status(200).json({
					accessToken: session.accessToken,
					refreshToken: session.refreshToken
				});
			} else {
				setSessionToCookie(res, session)
				res.status(200).json({ message: 'Authenticated successfully' });
			}
		} catch (err) {
			handleError(err, res)
		}
	}

	async function handleRefresh(req, res) {
		try {
			const clientId = req.header('Client');
			let refreshToken = req.body.refreshToken || req.cookies.refreshToken;;
			if (!refreshToken) {
				throw new ValidationError(400, 'Refresh token required')
			}
			const newSession = await sessionService.refreshSession(refreshToken, clientId);
			if (process.nativeApps.includes(session.clientId)) {
				res.status(200).json({
					accessToken: session.accessToken,
					refreshToken: session.refreshToken
				});
			} else {
				setSessionToCookie(res, newSession);
				res.status(200).json({ message: 'Session is refreshed successfully' });
			}
		} catch (err) {
			handleError(err, res)
		}
	}

	function setSessionToCookie(res, session) {
		res.cookie('accessToken', session.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'prod',
			sameSite: 'Strict'
		});
		res.cookie('refreshToken', session.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'prod',
			sameSite: 'Strict'
		});
	}

	return Object.freeze({
		handleRegister,
		handleLogin,
		handleRefresh
	})
}

module.exports = authController;