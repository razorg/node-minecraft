var net = require('net');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var handlers = require('./handlers');

function Server() {
	var self = this;
	this.clientsConnected = 0;
	this.clientsCap = 130;
	this.motd = 'HOLA MAN!';

	this.server = net.createServer();
	this.server.on('connection', function (c) {
		self.emit('connection', c);
		c.on('data', function (data) {
			console.log('Received packet :', data);
			if (typeof handlers[data[0]] === 'undefined') {
				console.log('Dont know how to handle this packet! Bye :O');
				process.exit(-1);
			}
			handlers[data[0]].call(self, c, data);
		});
	});
}

util.inherits(Server, EventEmitter);

Server.prototype.listen = function (port, cb) {
	this.server.listen(port, cb);
}

module.exports = Server;