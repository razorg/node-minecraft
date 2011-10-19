var types = require('./types');
var packet = require('./packet');



function loginRequest(c, params) {
	if (params.proto_ver != 17) {
		c.end(packet.gen(0xff, {
			reason: 'Protocol ' + params.proto_ver + ' is not supported'
		}));
	}
}

function serverList(c) {
	var resp = packet.gen(0xff, {
		reason: this.motd + '§' + this.clientsConnected + '§' + this.clientsCap
	});
	/*
	* Might need this. CityCraft does not have 0x00 as last byte
	*	resp = resp.slice(0, resp.length - 1);
	*/
	c.end(resp);
}

function handshake(c, params) {
	console.log(params.username);
	this.emit('handshake', params.username, c);
	if (this.clientsConnected == this.clientsCap) {
		c.end(packet.gen(0xff, {
			reason: 'If more players join, this machine will hang up!'
		}));
	}
	else {
		c.write(packet.gen(0x02, {
			hash: '2e66f1dc032ab5f0'
		}));
	}
}

var packetHandlers = {
	0x01: loginRequest,
	0x02: handshake,
	0xfe: serverList
};

module.exports = packetHandlers;