const path = require('path');
const http = require('http');
const express = require('express');


const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined.'));


  socket.on('createMessage', (message) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
  });


//   socket.broadcast.emit('newMessage', {
//       from: message.from,
//       text: message.text,
//       createdAt: new Date().getTime()
//   });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});



app.get('/', (req, res) => {
  res.send(publicPath);
});
server.listen(PORT);
console.log(`Listening on PORT ${PORT}`)
