var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var currentNames = "APPL";
var stocks = ["MSFT", "YHOO", "AAPL"];
app.use(express.static('public'));

io.on('connection', function(socket) {
  socket.emit("stockUpdate", stocks);
socket.on('add', function(stockToAdd) {
  console.log("stockToAdd" + stockToAdd);
stocks.push(stockToAdd);
socket.emit("stockUpdate", stocks);
  //io.emit('names', msg);
});
socket.on('remove', function(stockToRemove) {
  console.log("stockToRemove" + stockToRemove);
var toBeCut = stocks.indexOf(stockToRemove);
stocks.splice(toBeCut,1);
socket.emit("stockUpdate", stocks);
  //io.emit('names', msg);
});
});

http.listen((process.env.PORT), function(){
  console.log('listening on *:' + (process.env.PORT));
});
