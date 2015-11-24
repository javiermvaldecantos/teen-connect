var express = require('express');
var io = require('socket.io');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var user = 'unknown';
	var loggedUsers = req.app.get('allUsers');
	if(req.query.username) {
		user = req.query.username;

		if(loggedUsers.indexOf(user) === -1) {	//user was removed
			loggedUsers.push(user);
			req.app.set('allUsers', loggedUsers);
		}
	}
	res.render('users', {title: 'User List', username: user, loggedUsers: loggedUsers});
	console.dir(io);
});

module.exports = router;
