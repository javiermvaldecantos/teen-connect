/*
 * Router for the chat web page
 */
var express = require('express');

/*configure web socket on port 8888*/
//var io = require('socket.io').listen(8888);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.query.username) {
		res.render('chat', { title: 'Chat Room', username: req.query.username});
	} else {
		res.render('index', {title: 'Login', warning: 'You cannot access the chat directly by URL. Choose a username and log in.'});
	}
});

router.post('/', function(req, res){
	console.log("req.body = ");
	console.log(req.body);	//req.body is an object containing all post parameters
	console.log("");		//in our case req.body.name = "whatever the user entered"
	
	if(req.body.username === "") {
		res.render('index', {title: 'Login', warning: 'Username was empty! Choose a username to enter the chatroom'});
	} else {
		res.render('chat', { title: 'Chat Room', username: req.body.username});
	}
});
module.exports = router;