const { UserAllreadyExist } = require("../../../domain/errors/index.js");
const { ValidationError, HTTPError } = require("../../errors/index.js");

function authController(sessionService) {
	function handleError(err, res) {
		if (err instanceof HTTPError) {
			const statusCode = err.statusCode;
			res.status(statusCode).json({ message: err.message });
		} else if (err instanceof UserAllreadyExist) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(404).json({ message: 'Invalid request' });
		}
	}


	async function handleSignup(req, res) {
		try {
			const { username, password } = req.body;
			const clientId = req.header('Client') ?? 'Web';
			const user = await sessionService.signupSession(username, password, clientId);
			sendTokenResponse(res, user.session)
		} catch (err) {
			handleError(err, res)
		}
	}

	async function handleLogin(req, res) {
		try {
			const { username, password } = req.body;
			const clientId = req.header('Client') ?? 'Web';
			const session = await sessionService.loginSession(username, password, clientId);
			sendTokenResponse(res, session);
		} catch (err) {
			handleError(err, res)
		}
	}

	async function handleRefresh(req, res) {
		try {
			const clientId = req.header('Client') ?? 'Web';
			let refreshToken = req.body.refreshToken || req.cookies.refreshToken;;
			if (!refreshToken) {
				throw new ValidationError(400, 'Refresh token required')
			}
			const newSession = await sessionService.refreshSession(refreshToken);
			sendTokenResponse(res, newSession);
		} catch (err) {
			handleError(err, res)
		}
	}

	function sendTokenResponse(res, session) {
		if (process.nativeApps.includes(session.clientId)) {
			res.status(200).json({
				accessToken: session.accessToken,
				refreshToken: session.refreshToken
			});
		} else {
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
			res.status(200).json({ message: 'Authentication successful' });
		}
	}

	return Object.freeze({
		handleSignup,
		handleLogin,
		handleRefresh
	})
}

module.exports = authController;