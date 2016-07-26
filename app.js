var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var currentNames = "APPL";
app.use(express.static('public'));

io.on('connection', function(socket) {
  console.log('a user connected');
socket.on('add', function(msg) {
  console.log(msg);
  //io.emit('names', msg);
});
});

http.listen((process.env.port || 8888), function(){
  console.log('listening on *:' + (process.env.port || 8888));
});
