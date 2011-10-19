var types = require('./types');
var colors = require('colors');

function readLoginReq(packet) {
	return {
		proto_ver: packet.readInt32BE(1),
		username: types.readString16(packet, 4)
	};
}

function readHandshake(packet) {
	var username = types.readString16(packet, 1);
	return {
		username: username
	};
}


var packet_readers = {
	0x01: readLoginReq,
	0x02: readHandshake,
};

module.exports = function readPacket(packet) {
	return packet_readers[packet[0]](packet);
}