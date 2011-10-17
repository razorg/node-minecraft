mc = require('./');

var s = new mc.Server();
s.listen(65000);
s.on('connection', function (c) {
	console.log('connected');
});

s.on('login-request', function (uname, c) {
	console.log(uname, 'would like to login!');
});
