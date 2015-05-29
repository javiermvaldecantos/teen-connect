var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var chat = require('./routes/chat');
var users = require('./routes/users');

var app = express();

/*configure server to listen on port 3000*/
var server = app.listen(3000, function() {
	console.log("Go to http://localhost:3000");
});

/*
 * WEB SOCKET
 */
var io = require('socket.io').listen(server);

/*
 * Global variable 'allUsers' to be accesible accross the app
 *
 * In the routes it's accessible by req.app.get('allUsers')
 *
 * Modificable by app.set('allUsers', newValue)
 */
app.set('allUsers', []);

//Place a listener called when a user connects to the socket
io.on('connection', function(socket) {
	console.log("[WEBSOCKET] A user connected");

	//listener for messages sent from the chat
	socket.on('chat message', function(data) {
		console.log("[WEBSOCKET] chat message: " + data.sender + " - " + data.message);
		//Broadcast message to everyone
		io.emit('chat message', data);
	});

	//listener for likes
	socket.on('like', function(sender) {
		console.log("[WEBSOCKET] " + sender + " likes it");
		io.emit('like', sender);
	});

	//listener for deleting users
	socket.on('delete user', function(user) {
		var loggedUsers = app.get('allUsers');
		var index = loggedUsers.indexOf(user);
		if(index > -1) {
			loggedUsers.splice(index, 1);
		}
		app.set('allUsers', loggedUsers);
		console.log("[WEBSOCKET] User " + user + " removed");
	});

	//disconnect event
	socket.on('disconnect', function() {
		console.log('[WEBSOCKET] A user disconnected');
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/chat', chat);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
