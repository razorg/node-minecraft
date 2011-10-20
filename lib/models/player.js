function Player(opts) {
	this.x = opts.x;
	this.y = opts.y;
	this.z = opts.z;
	this.stance = opts.stance;
	this.on_ground = opts.on_ground;
}

Player.prototype.update(opts) {
	this.constructor(opts);
}

exports.Player = player;