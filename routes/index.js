var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Login'});
});

router.post('/', function(req, res){
	console.log("req.body = ");
	console.log(req.body);	//req.body is an object containing all post parameters
	console.log("");		//in our case req.body.name = "whatever the user entered"

	if(req.body.username === "") {
		res.render('index', {title: 'Login', warning: 'Username was empty! Choose a username to enter the chatroom.'});
	
	} else {	//user entered a non-empty username

		var loggedUsers = req.app.get('allUsers');
		
		var index = loggedUsers.indexOf(req.body.username);
		
		if(index === -1) {	//the username selected is new. Load the chat room!
			
			loggedUsers.push(req.body.username);
			req.app.set('allUsers', loggedUsers);
			console.dir(loggedUsers);
			res.render('chat', { title: 'Chat Room', username: req.body.username});

		} else {
			//some other user already selected this username. Send warning message.
			res.render('index', {title: 'Login', warning: 'Username chosen is already taken! Choose another username.'});
		}
	}
});

module.exports = router;