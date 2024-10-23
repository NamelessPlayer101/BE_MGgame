class SocketService {
  connection(socket) {
    console.log(`${socket.id} connected`);

    socket.on("disconnect", (reason) => {
      console.log(`reason: ${reason}`);
    });

    // Ping
    socket.on("ping", (callback) => {
      callback();
    });

    // Chat
    socket.on("chat", (msg) => {
      _io.emit(
        "chat",
        JSON.stringify({
          id: socket.id,
          message: msg,
        })
      );
    });

    // Game
    socket.on("game", () => {
      _io.emit(
        "game",
        JSON.stringify({
          id: socket.id,
          message: 'Hehe',
        })
      );
    });
  }
}

module.exports = new SocketService();
