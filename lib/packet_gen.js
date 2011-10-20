var types = require('./types');
var colors = require('colors');


function genLogin(opts) {
	var resp = new Buffer(1	// Packet ID (byte) -- 0x01
											+ 4 	// Entity ID (int)
											+ 2	// not used (string16)
											+ 8		// Map seed (long)
											+ 4		// Server mode (int)
											+ 1 	// Dimension (byte)
											+ 1 	// Difficulty (byte)
											+ 1 	// World height (unsigned byte)
											+ 1)  // Max players (unsigned byte)
	resp[0] = 0x01;
	resp.writeInt32BE(opts.entity_id, 1);
	types.writeString16(resp, 4, '');
	types.writeLong(resp, opts.map_seed, 6);
	resp.writeInt32BE(opts.server_mode, 14);
	resp.writeInt8(opts.dimension, 18);
	resp.writeInt8(opts.difficulty, 19);
	resp.writeUInt8(opts.world_height, 20);
	resp.writeUInt8(opts.max_players, 21);
	return resp;
}


function genHandshake(opts) {
	if (typeof opts.hash === 'undefined') {
		throw new Error('missing property hash');
	}
	var resp = new Buffer(opts.hash.length*2 + 3);
	resp[0] = 0x02;
	types.writeString16(resp, 1, opts.hash);
	return resp;
}

function genPlayerPnL(opts) {
	var resp = new Buffer(42);
	resp[0] = 0x0d;
	types.writeDouble(resp, opts.x, 1);
	types.writeDouble(resp, opts.stance, 9);
	types.writeDouble(resp, opts.y, 17);
	types.writeDouble(resp, opts.z, 25);
	types.writeFloat(resp, opts.yaw, 33);
	types.writeFloat(resp, opts.pitch, 37);
	types.writeUByte(resp, opts.on_ground, 41);
}

function genKick(opts) {
	if (typeof opts.reason === 'undefined') {
		throw new Error('missing property reason');
	}
	var resp = new Buffer(opts.reason.length*2 + 3);
	resp.fill(0x69);
	resp[0] = 0xff;
	types.writeString16(resp, 1, opts.reason);
	return resp;
}


var packet_generators = {
	0x01: genLogin,
	0x02: genHandshake,
	0x0d: genPlayerPnL,
	0xff: genKick
};

module.exports = function genPacket(id, opts) {
	var buf = packet_generators[id](opts);
	console.log('[S → C]', buf.toString('hex').cyan);
	return buf;
}