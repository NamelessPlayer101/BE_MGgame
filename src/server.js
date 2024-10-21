require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const SocketService = require("./api/services/socket");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingInterval: 10000,
  pingTimeout: 30000,
});
global._io = io;
global._io.on("connection", SocketService.connection);

app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.use("/chat", require("./api/routes/chat.route"));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    code: err.status,
    message: err.message,
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
