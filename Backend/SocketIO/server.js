import {Server} from 'socket.io'
import cors from 'cors'
import http from 'http'
import express from 'express'



const app = express();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://chatapp-cz01.onrender.com"],  // Frontend origins
    methods: ["GET", "POST"],
    credentials: true,  // Allow credentials (cookies, headers)
  },
});
// realtime msg code
export const getReceiverSocketId=(receiverId)=>{ return users[receiverId];}


const users={}

// used to listen events on server side
io.on("connection",(socket)=>{
  console.log("A user connected",socket.id);
  const userId = socket.handshake.query.userId;
 if(userId){
  users[userId]=socket.id

 }

// used to send the events to allconnected users
 io.emit("getOnlineUsers",Object.keys(users))



 // used to listen client side  events emmited by server side (server & client)

  socket.on("disconnect",()=>{
    console.log("a user discconected",socket.id);
    delete users[userId];
    io.emit("getOnlineUsers",Object.keys(users));
  });
})

export {app,io,server}