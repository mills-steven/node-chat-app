const path = require('path');
const http = require('http');
const express = require('express');


const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined.'));


  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));

  });
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});



app.get('/', (req, res) => {
  res.send(publicPath);
});
server.listen(PORT);
console.log(`Listening on PORT ${PORT}`)
