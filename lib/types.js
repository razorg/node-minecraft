exports.addString16 = function (buf, offset, str) {
	buf.writeUInt16BE(str.length, offset);
	buf.write(str, offset + 3, 'ucs2');
}

exports.readString16 = function (buf, offset) {
	var len = buf.readUInt16BE(offset);
	console.log(buf);
	/* Why on earth utf-8 works on a utf-16 string, one god knows */
	return buf.toString('utf-8', offset + 3, offset + 2 + len*2 + 1);
}