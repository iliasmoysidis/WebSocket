const PORT = 3000;

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.get("/greet/:name", (req, res) => {
  res.json({ greeting: `Hello ${req.params.name}!` });
});

app.listen(PORT, () => {
  console.log(`Server is now listeing on PORT ${PORT}`);
});
