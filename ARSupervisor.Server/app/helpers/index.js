function getIPAddress() {
	const os = require('node:os');
	const interfaces = os.networkInterfaces();
	let ipAddress;
	for (const [key, values] of Object.entries(interfaces)) {
		if (key.includes('en')) {
			values.forEach(element => {
				if (element.family.includes('IPv4')) {
					ipAddress = element.address;
				}
			});
		}
	}
	return ipAddress
};

module.exports = {
	getIPAddress
}