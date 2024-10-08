require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io')

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

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat', (msg) => {
        io.emit('chat', JSON.stringify({
            id: socket.id,
            message: msg
        }));
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
