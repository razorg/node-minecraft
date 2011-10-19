var types = require('./types');
var colors = require('colors');

function genKick(opts) {
	if (typeof opts.reason === 'undefined') {
		throw new Error('missing property reason');
	}
	var resp = new Buffer(opts.reason.length*2 + 3);
	resp.fill(0x69);
	resp[0] = 0xff;
	types.addString16(resp, 1, opts.reason);
	return resp;
}

function genHandshake(opts) {
	if (typeof opts.hash === 'undefined') {
		throw new Error('missing property hash');
	}
	var resp = new Buffer(opts.hash.length*2 + 3);
	resp[0] = 0x02;
	types.addString16(resp, 1, opts.hash);
	return resp;
}

var packet_generators = {
	0xff: genKick,
	0x02: genHandshake
};

module.exports = function genPacket(id, opts) {
	var buf = packet_generators[id](opts);
	console.log('[S → C]', buf.toString('hex').cyan);
	return buf;
}