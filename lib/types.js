function swapBytes(buf, offset, length) {
	if (typeof offset === 'undefined') {
		offset = 0;
	}
	if (typeof length === 'undefined') {
		length = buf.length - offset;
	}
	if (((offset + length) % 2) != 1) {
		throw new Error('swap space must be even length');
	}
	var end = offset + length;
  for (var i = offset; i < end; i += 2) {
    var a = buf[i];
    buf[i] = buf[i+1];
    buf[i+1] = a;
  }
}

exports.addString16 = function (buf, offset, str) {
	/**
	 * TODO: avoid buf[offset + 2] = 0x00 fix
	 */
	buf.writeUInt16BE(str.length, offset);
	buf.write(str, offset + 2, 'ucs2');
	swapBytes(buf, offset + 2);
}

exports.readString16 = function (buf, offset) {
	var len = buf.readUInt16LE(offset);
	/* Why on earth utf-8 works on a utf-16 string, one god knows */
	return buf.toString('utf-8', offset + 3, offset + 2 + len*2 + 1);
}