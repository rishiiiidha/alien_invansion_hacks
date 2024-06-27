const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");
const socketio = require("socket.io");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./users/user");

dotenv.config();

const app = express();
const server = createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);

    // Sending a welcome message to the user
    socket.emit("message", {
      user: "admin",
      text:
        user.room === "victim"
          ? "Attention victims: This is a critical situation..."
          : "Rescuers, listen up: Your mission is critical...",
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the ${user.room} room!`,
    });
    socket.broadcast.to("victim").emit("message", {
      user: "admin",
      text: `${user.name} has joined the ${user.room} room!`,
    });

    socket.broadcast.to("rescuer").emit("message", {
      user: "admin",
      text: `${user.name} has joined the ${user.room} room!`,
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the room.`,
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
