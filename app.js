const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
});

io.on('connection', (socket, name) => {
    io.emit('user join', { for: 'everyone' });
    console.log('New user entered the server.');

    socket.on('disconnect', () => {
        io.emit('user leave', { for: 'everyone' });
        console.log('A user left the server.')
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('A user wrote a message.');
    });
});

server.listen(3000, () => console.log('listening on localhost:3000'));

