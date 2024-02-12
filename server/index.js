const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
dotenv.config();

const port = process.env.PORT || 4019;
let users = [{}];

app.get("/", (req, res) => {
  res.send("Please go to the hell😑");
});

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New connection!");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);

    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} User has joined`,
    });

    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat ${users[socket.id]}`,
    });

    socket.on("message", ({ message, id }) => {
      io.emit("sendMessage", { user: users[id], message, id });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("leave", {
        user: "Admin",
        message: `${users[socket.id]} has left`,
      });
      console.log("User disconnect");
    });
  });

  //https://www.youtube.com/watch?v=u-LBihwjVDk&ab_channel=6PackProgrammer
});

server.listen(port, () =>
  console.log(`This server is runing http://localhost:${port}`)
);
