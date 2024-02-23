const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.41:3000"],
  },
});
const port = process.env.PORT || 8585;
const { errorHandler } = require("./Helpers/dbErrorHandler");
const { connectToDatabase } = require("./Helpers/dbConnection");
const ChatMessage = require("./model/ChatMessage");

// const runSeed = require("./seeds");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth-user", require("./routes/auth-user"));
app.use("/api", require("./routes/profileRoutes"));
app.use("/api", require("./routes/bookingRoutes"));
app.use("/api", require("./routes/inventoryRoutes"));
app.use("/api", require("./routes/chatRoutes"));

// Database connection
connectToDatabase();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to gaming app Home");
});

io.on("connection", (socket) => {
  console.log("Connected to socket");
  socket.on("connectToAdmin", (userId) => {
    socket.join(userId);
  });

  socket.on("leaveOldChatRoom", (userId) => {
    if (userId) {
      socket.leave(userId);
    }
  });

  socket.on("connectToUser", (userId) => {
    socket.join(userId);
  });

  socket.on("sendMessage", async (message, userId, socketId, id) => {
    const userExist = await ChatMessage.findOne({ userId: userId });

    if (!userExist?.userId) {
      const newChatMessage = new ChatMessage({
        userId,
        userMessages: [{ userId: id, message: message }],
      });
      await newChatMessage.save();
    } else {
      userExist.userMessages.push({ userId: id, message: message });
      await userExist.save();
    }

    io.to(userId).emit("receiveMessage", message, userId, socketId);
  });
});

async function startServer() {
  server.listen(port, () => {
    console.clear();
    console.log(
      `Server is running on port ${port} at ${process.env.NODE_ENV} mode`
    );
  });
}

// global error handler
app.use(function (err, req, res, next) {
  return res.status(500).json({
    error: errorHandler(err) || "Something went wrong! ****SERVER_ERROR****",
  });
});

startServer();
