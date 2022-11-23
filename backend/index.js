import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

mongoose.connect("mongodb://localhost:27017/crud_mern_stack_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(cors());
app.use(express.json());
app.use(UserRoute);

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});

//app.listen(5000, () => console.log("Server has started."));
server.listen(5000, () => console.log("Server has started."));
