const PORT = 3000;
const CONNECTED_USERS = [];

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});

server.listen(PORT, () => {
  console.log(`Server is now listening on PORT ${PORT}`);
});

io.on("connect", (socket) => {
  console.log(`User ${socket.id} connected`);
  CONNECTED_USERS.push(socket);

  socket.on("disconnect", () => {
    const index = CONNECTED_USERS.findIndex((u) => u.id === socket.id);
    if (index !== -1) {
      CONNECTED_USERS.splice(index, 1);
      console.log(`User ${socket.id} disconnected`);
    }
  });
});
