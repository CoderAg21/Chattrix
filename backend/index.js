const express = require('express');
const config = require('./config/env');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./config/db');
const http = require('http');
const {Server} = require('socket.io');
const server = http.createServer(app);
const onlineUsers = new Map(); // userId => socket.id
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
//connect the database
db();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend port
   methods:["POST",'GET'],
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("✅ New socket connection:", socket.id);

  socket.on("userOnline", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`${userId} is online`);
    console.log(onlineUsers)
  })
  socket.on("checkOnline", (targetUserId, callback) => {
    const isOnline = onlineUsers.has(targetUserId);
    callback(isOnline);
  });

  socket.on("disconnect", () => {
    for (let [key, value] of onlineUsers) {
  if (value === socket.id) {
    onlineUsers.delete(key);
    break; // if you only want to delete the first match
  }
}
    console.log("❌ Disconnected:", socket.id);
  });
  socket.on('join room',(room)=>{
    socket.join(room)
  })
  socket.on('leave room',(room)=>{
    socket.leave(room)
  })
  socket.on("send", ({msgItem,currentRoom}) => {
    msgItem.sendBy = 'Server'
    console.log(msgItem,currentRoom)
  socket.to(currentRoom).emit('Recieve',(msgItem))

});

});


app.use(express.json());
app.use(cookieParser());
app.use('/signup', require('./Routes/signup'));
app.use('/login', require('./Routes/login'));
app.use('/contacts', require('./Routes/contacts'));
app.use('/logout', require('./Routes/logout'));
app.use('/add-contact', require('./Routes/addContact'));
app.use('/auth', require('./Routes/checkAuth'));
app.use('/message', require('./Routes/message'));
app.use('/show-message', require('./Routes/showStoredMessages'));


server.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
}  );
// app.use(cors({
