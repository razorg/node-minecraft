var types = require('./types');

var packetHandlers = {
	0xfe: function (c) {
		var message = this.motd + '§' + this.clientsConnected + '§' + this.clientsCap;
		var resp = new Buffer(message.length*2 + 4);
		for (var i = 0; i < resp.length; i++) {
			resp[i] = 0x00;
		}
		resp[0] = 0xff;
		types.addString16(resp, 1, message);
		/*
		* Might need this. CityCraft does not have 0x00 as last byte
		*	resp = resp.slice(0, resp.length - 1);
		*/
		c.end(resp);
	},
	0x02: function (c, data) {
		this.emit('login-request', types.readString16(data, 1), c);
		//if (this.clientsConnected == this.clientsCap) {
			var buf = new Buffer(3);
			buf[0] = 0xff;
			buf[1] = 0x00;
			buf[2] = 0x00;
			c.end(buf);
		//}
	}
};

module.exports = packetHandlers;