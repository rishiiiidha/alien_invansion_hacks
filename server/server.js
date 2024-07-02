const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { createServer } = require("http");
const socketio = require("socket.io");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./users/user"); 
const storyRoutes = require("./routes/stories"); 
const socketRoutes = require("./routes/socket"); 

dotenv.config();

const app = express();
app.use(express.json());

const server = createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("App Connected to database!"))
  .catch((e) => console.log(e));


app.use(cors({ origin: "http://localhost:5173" }));


app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/", socketRoutes);
app.use("/story", storyRoutes);


io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

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
