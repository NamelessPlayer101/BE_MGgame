class SocketService {
  connection(socket) {
    console.log(`${socket.id} connected`);

    socket.on("disconnect", (reason) => {
      console.log(`reason: ${reason}`);
    });

    socket.on("chat", (msg) => {
      _io.emit(
        "chat",
        JSON.stringify({
          id: socket.id,
          message: msg,
        })
      );
    });
  }
}

module.exports = new SocketService();