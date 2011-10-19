var net = require('net');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var handlers = require('./handlers');
var packet = require('./packet');

function Server() {
	var self = this;
	this.clientsConnected = 0;
	this.clientsCap = 130;
	this.motd = 'HOLA MAN!';

	this.server = net.createServer();
	this.server.on('connection', function (c) {
		self.emit('connection', c);
		c.on('data', function (data) {
			console.log('[C → S]', data.toString('hex').yellow);
			if (typeof handlers[data[0]] === 'undefined') {
				console.log('Dont know how to handle this packet! Bye :O'.red);
				process.exit(-1);
			}
			if (data.length != 1) {
				var params = packet.read(data);
			}
			handlers[data[0]].call(self, c, params);
		});

		c.on('close', function (err) {
			if (err) {
				console.log('client closed with error:'.red, err.red);
			}
		});
	});
}

util.inherits(Server, EventEmitter);

Server.prototype.listen = function (port, cb) {
	this.server.listen(port, cb);
}

module.exports = Server;