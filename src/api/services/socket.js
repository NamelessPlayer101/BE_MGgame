class SocketService {
  connection(socket) {
    console.log(`${socket.id} connected`);

    socket.on("disconnect", (reason) => {
      console.log(`reason: ${reason}`);
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
    socket.on("game", (msg) => {
      _io.emit(
        "game",
        JSON.stringify({
          id: socket.id,
          message: msg,
        })
      );
    });
  }
}

module.exports = new SocketService();
