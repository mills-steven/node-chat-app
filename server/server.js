const path = require('path');
const http = require('http');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the Chat App!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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
