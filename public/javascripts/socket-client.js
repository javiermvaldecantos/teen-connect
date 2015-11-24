/*
 * script for the client side of web sockets
 */
var socket = io();	//load the client side of web socket
var currentUser = $('.username')[0].id;

var send_message = function(sender, content) {
	if(sender === currentUser) {
		var table_row = $('<tr class="tr-chat info"></tr>');
	} else {
		var table_row = $('<tr class="tr-chat"></tr>');
	}
	table_row.append('<td class="sender">' + sender + '</td>');
	table_row.append('<td class="message">' + content + '</td>');
	$('.chat-body').append(table_row);
	var chat_fixed_height = $('.chat-body').height();
	var chat_real_height = $('.chat-body')[0].scrollHeight;
	var chat_offset = chat_real_height - chat_fixed_height;

	//scroll chat to the bottom (new message)
	$('.chat-body').scrollTop(chat_offset);
}

//send message on form submission
$('form').submit(function() {
	//send message to socket as a message event
	var message_content = $('#msg').val();
	if(message_content === "") {
		//message is empty, don't send it
	} else {
		var data = {sender:currentUser, message:message_content};
		socket.emit('chat message', data);
		$('#msg').val('');
	}
	return false;	//this statement avoids submitting the form (i.e. sending a request)
});

//listener for messages
socket.on('chat message', function(data) {
	send_message(data.sender, data.message);
});

/*
 * LIKE BUTTON
 */
//sender
$('#button-like').on('click', function() {
	var sender = currentUser;
	socket.emit('like', sender);
});

//listener
socket.on('like', function(sender) {
	var like_image = '<img src="/images/like-25px.png">';
	send_message(sender, like_image);
});

/*
 * Tell socket server to remove user when the window closes
 */
window.onbeforeunload = function(e) {
	//remove current user from logged set as he's leaving the chat room
	socket.emit('delete user', currentUser);

	//return "are you sure? " + currentUser;
}