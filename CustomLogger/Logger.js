function Logger(service){
	this.service = service
}

Logger.prototype.formatLog = function(level, message) {
    const timestamp = new Date().toISOString();
    const paddedService = this.service;
	const spacer = "".padEnd(1)
	const prefix = `[${timestamp}][${paddedService}][${level}]`.padEnd(50);
	return `${prefix}${spacer}${message}`;
}

Logger.prototype.logError = function(message) {
	console.log(this.formatLog('ERROR', message));
}

Logger.prototype.logInfo = function(message) {
	console.log(this.formatLog('INFO', message));
}

Logger.prototype.log = function(message) {
	console.log(this.formatLog('INFO', message));
}

module.exports = Logger;