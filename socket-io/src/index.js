const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/selectChat.html');
});

app.get('/chat/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.of('/twitter').on('connection', (socket) => {
  console.log('new TWITTER connection', socket.conn.id)
  socket.on('message', msg => {
    console.log('msg', msg)
    socket.broadcast.emit('message', msg);
  });
});

io.of('/facebook').on('connection', (socket) => {
  console.log('new FACEBOOK connection', socket.conn.id)
  socket.on('message', msg => {
    console.log('msg', msg)
    socket.broadcast.emit('message', msg);
  });

  socket.on('disconnect', reason => {
    console.log('disconnect', reason)
    //socket.broadcast.emit('message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
