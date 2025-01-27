const PORT = 3000;
const users = { public: new Set(), authenticated: new Map() };

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});

function addPublicUser(socket) {
  users.public.add(socket);
  console.log(`User ${socket.id} connected`);
}

function removePublicUser(socket) {
  users.public.delete(socket);
  console.log(`User ${socket.id} disconnected`);
}

function addAuthenticatedUser(socket, email) {
  users.authenticated.set(socket, email);
  console.log(`User with email ${email} has logged in`);
}

function removeAuthenticatedUser(socket) {
  users.authenticated.delete(socket);
}

function removeUser(socket) {
  removePublicUser(socket);
  users.authenticated.delete(socket);
}

server.listen(PORT, () => {
  console.log(`Server is now listening on PORT ${PORT}`);
});

app.post("/callback", (req, res) => {
  const { userEmail, url } = req.body;

  let userFound = false;
  for (let [socket, email] of users.authenticated.entries()) {
    if (userEmail === email) {
      const targetSocket = io.sockets.sockets.get(socket.id);
      targetSocket.emit("url", url);
      userFound = true;
      break;
    }
  }

  if (userFound) {
    return res
      .status(200)
      .json({ message: `Event sent to user with email ${userEmail}` });
  } else {
    return res
      .status(404)
      .json({ message: `User with email ${userEmail} not found` });
  }
});

io.on("connect", (socket) => {
  addPublicUser(socket);

  socket.on("disconnect", () => {
    removeUser(socket);
  });

  socket.on("login", (email) => {
    addAuthenticatedUser(socket, email);
    removePublicUser(socket);
  });

  socket.on("logout", () => {
    removeAuthenticatedUser(socket);
    addPublicUser(socket);
  });
});
