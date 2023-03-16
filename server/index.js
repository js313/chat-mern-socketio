const express = require("express");
const app = express();
const http = require("http");
const { default: mongoose } = require("mongoose");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const CustomError = require("./CustomError/CustomError");
const { protect } = require("./middlewares/authMiddleware");
const roomRouter = require("./routes/roomRouter");
require("dotenv").config({ path: path.join(__dirname, "/config.env") });

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use(protect);
app.use("/api/room", roomRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    res.status(err.code).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // socket.on("create-room", (name) => {
  //   console.log("Room created with name:", name);
  // });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
