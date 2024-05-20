const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const server = app.listen(5000, () => {
  console.log("Server started on 5000");
});

const io = new Server(server, {
  cors: {
    origin: "https://music-server-rtgy.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("joinRoom", (data) => {
    socket.join(data.roomId);
  });
  socket.on("send", (data) => {
    console.log(data);
    socket.to(data.roomId).emit("recieve", { message: "hai there" });
  });

  socket.on("playSong", (data) => {
    console.log(data);
    socket.to(data.roomId).emit("playOnClient", data);
  });

  socket.on("pauseSong", (data) => {
    socket.to(data.roomId).emit("pauseOnClient", data);
  });
});
