const PORT = 3000;

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.listen(PORT, () => {
  console.log(`Server is now listeing on PORT ${PORT}`);
});

io.on("connect", (socket) => {
  console.log(`User ${socket.id} connected`);
});
