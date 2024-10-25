const backEndPlayers = {};

class SocketService {  
  connection(socket) {
    console.log(`${socket.id} connected`);

    socket.on("disconnect", (reason) => {
      console.log(`reason: ${reason}`);
      delete backEndPlayers[socket.id];
      _io.emit('updatePlayers', backEndPlayers);
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
    socket.on("game", (data) => {
      const playerInit = JSON.parse(data);
      backEndPlayers[socket.id] = {
        ...playerInit,
        radius: 15,
      }

      _io.emit(
        "game",
        JSON.stringify({
          code: 200,
          id: socket.id,
          data: backEndPlayers,
        })
      );
    });

    socket.on("updatePlayers", (data) => {
      const playerInit = JSON.parse(data);
      backEndPlayers[socket.id] = {
        ...playerInit,
        radius: 15,
      }

      _io.emit(
        "updatePlayers",
        JSON.stringify({
          code: 200,
          id: socket.id,
          data: backEndPlayers,
        })
      );
    });
  }
}

module.exports = new SocketService();
