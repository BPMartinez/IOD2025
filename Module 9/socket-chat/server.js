const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(path.join(__dirname, "public")));


const onlineUsers = new Map();

io.on("connection", (socket) => {

  let nickname = `User-${socket.id.slice(0, 4)}`;
  onlineUsers.set(socket.id, nickname);

  console.log(`${nickname} connected`);

 
  socket.broadcast.emit("user connected", nickname);

  io.emit("user list", Array.from(onlineUsers.values()));

  socket.on("set nickname", (newName) => {
    if (!newName || typeof newName !== "string") return;
    newName = newName.trim();
    if (!newName) return;

    const oldName = nickname;
    nickname = newName;
    onlineUsers.set(socket.id, nickname);

    io.emit("user list", Array.from(onlineUsers.values()));
    io.emit("nickname changed", { oldName, newName: nickname });
  });

  socket.on("chat message", (messageText) => {
    if (!messageText || typeof messageText !== "string") return;
    const payload = {
      nickname,
      message: messageText,
      time: new Date().toISOString(),
    };

 
    socket.broadcast.emit("chat message", payload);
  });


  socket.on("typing", (isTyping) => {
    if (isTyping) {
      socket.broadcast.emit("user typing", nickname);
    } else {
      socket.broadcast.emit("user stop typing", nickname);
    }
  });


  socket.on("disconnect", () => {
    console.log(`${nickname} disconnected`);
    onlineUsers.delete(socket.id);

   
    socket.broadcast.emit("user disconnected", nickname);

    
    io.emit("user list", Array.from(onlineUsers.values()));
  });
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Chat server running on http://localhost:${PORT}`);
});
