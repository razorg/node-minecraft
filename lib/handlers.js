var types = require('./types');
var packet = require('./packet');

function keepAlive(c, params) {
	
}

function loginRequest(c, params) {
	// If not v0.8.1, kick.
	if (params.proto_ver != 17) {
		c.end(packet.gen(0xff, {
			reason: 'Protocol ' + params.proto_ver + ' is not supported'
		}));
		return;
	}
	else {
		c.write(packet.gen(0x01, {
			entity_id: 1,
			map_seed: 214748364,
			server_mode: 1,
			dimension: 0,
			difficulty: 0,
			world_height: 128,
			max_players: 8
		}));
	}
}

function playerPos(c, params) {
	
}

function playerPnL(c, params) {
	
}

function handshake(c, params) {
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

function serverList(c) {
	var resp = packet.gen(0xff, {
		reason: this.motd + '§' + this.clientsConnected + '§' + this.clientsCap
	});
	c.end(resp);
}

var packetHandlers = {
	0x00: keepAlive,
	0x01: loginRequest,
	0x02: handshake,
	0x0b: playerPos,
	0x0d: playerPnL,
	0xfe: serverList
};

module.exports = packetHandlers;