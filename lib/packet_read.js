var types = require('./types');
var colors = require('colors');


function readKeepAlive(packet) {
	return {
		id: types.readInt(packet, 1)
	};
}

function readLoginReq(packet) {
	return {
		proto_ver: packet.readInt32BE(1),
		username: types.readString16(packet, 4)
	};
}

function readHandshake(packet) {
	return {
		username: types.readString16(packet, 1)
	};
}

function readPlayerPos(packet) {
	return {
		x:					types.readDouble(packet, 1),
		y:					types.readDouble(packet, 9),
		stance:			types.readDouble(packet, 17),
		z:					types.readDouble(packet, 25),
		on_ground:	types.readUByte(packet, 33)
	};
}

function readPlayerPnL(packet) {
	return {
		x:					types.readDouble(packet, 1),
		y:					types.readDouble(packet, 9),
		stance:			types.readDouble(packet, 17),
		z:					types.readDouble(packet, 25),
		yaw:				types.readFloat(packet, 33),
		pitch:			types.readFloat(packet, 37),
		on_ground:	types.readUByte(packet, 41)
	};
}


var packet_readers = {
	0x00: readKeepAlive,
	0x01: readLoginReq,
	0x02: readHandshake,
	0x0b: readPlayerPos,
	0x0d: readPlayerPnL
};

module.exports = function readPacket(packet) {
	return packet_readers[packet[0]](packet);
}