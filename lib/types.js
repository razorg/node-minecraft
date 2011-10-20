function swapBytes(buf, offset, length) {
	if (typeof offset === 'undefined') {
		offset = 0;
	}
	if (typeof length === 'undefined') {
		length = buf.length - offset;
	}
	if ((length % 2) != 0) {
		throw new Error('Swap space must be even length');
	}
	var end = offset + length;
  for (var i = offset; i < end; i += 2) {
    var a = buf[i];
    buf[i] = buf[i+1];
    buf[i+1] = a;
  }
}

exports.writeUByte = function (buf, num, offset) {
	buf.writeUInt8(num, offset);
}

exports.readUByte = function (buf, offset) {
	return buf.readUInt8(offset);
}

exports.writeByte = function (buf, num, offset) {
	buf.writeInt8(num, offset);
}

exports.readByte = function (buf, offset) {
	return buf.readInt8(offset);
}

exports.writeUInt = function (buf, num, offset) {
	buf.writeUInt32BE(num, offset);
}

exports.readUInt = function (buf, offset) {
	return buf.readUInt32BE(offset);
}

exports.writeInt = function (buf, num, offset) {
	buf.writeInt32BE(num, offset);
}

exports.readInt = function (buf, offset) {
	return buf.readInt32BE(offset);
}

exports.writeFloat = function (buf, num, offset) {
	buf.writeFloatBE(num, offset);
}

exports.readFloat = function (buf, offset) {
	return buf.readFloatBE(offset);
}

exports.writeDouble = function (buf, num, offset) {
	buf.writeDoubleBE(num, offset);
}

exports.readDouble = function(buf, offset) {
	return buf.readDoubleBE(offset);
}

exports.writeLong = function (buf, num, offset) {
	/**
	 * For now, accept only numbers that fit in 32 bits
	 */
	if ((num < -2147483648) || (num > 2147483647)) {
		throw new Error('Number is too small or too large');
	}
	if (num < 0) {
		buf.fill(0xff, offset, offset + 4);
	}
	else {
		buf.fill(0x00, offset, offset + 4);
	}
	buf.writeInt32BE(num, offset + 4);
}

exports.readLong = function (buf, offset) {
	return buf.ReadInt32BE(offset + 4);
}

exports.writeString16 = function (buf, offset, str) {
	/**
	 * TODO: avoid buf[offset + 2] = 0x00 fix
	 */
	buf.writeUInt16BE(str.length, offset);
	buf.write(str, offset + 2, 'ucs2');
	swapBytes(buf, offset + 2, str.length*2);
}

exports.readString16 = function (buf, offset) {
	var len = buf.readUInt16LE(offset);
	/* Why on earth utf-8 works on a utf-16 string, one god knows */
	return buf.toString('utf-8', offset + 3, offset + 2 + len*2 + 1);
}