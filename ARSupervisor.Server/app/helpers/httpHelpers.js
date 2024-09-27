function getAccessTokenFromHeader(req) {
	const authHeader = req.headers['authorization'];
	const accessToken = authHeader && authHeader.split(' ')[1];
	return accessToken;
}

module.exports = {
	getAccessTokenFromHeader
};