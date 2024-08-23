require('dotenv').config()
const express = require("express");
const { Server } = require("socket.io");
const createServer = require("http").createServer;
const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.static("public"));
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("connection", socket.id);
  socket.on("message", (m) => {
    io.to(m.roomId).emit("received-msg", m.message);
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
