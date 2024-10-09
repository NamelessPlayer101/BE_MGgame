require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io')
const SocketService = require('./api/services/socket');

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', (req, res) => {
    res.json('Hello World!');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
global._io = io;

global._io.on('connection', SocketService.connection);

// app.use(require('./api/routes/chat.route'));

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
