// Node server which will handle socket I/O connections
// const io=require('socket.io')(9000);
const cors=require("cors");
const io = require("socket.io")(9000, {
        cors: {
              origin: "http://localhost:9000",
              methods: ["GET", "POST"]
            }
          });
io.use(cors());
const users={};
io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        console.log("New user", name);
        users[socket.id]=name; 
        socket.brodcast.emit('user-joined', name);
    });
    socket.on('send', message=>{
        socket.brodcast.emit('recieve', {message:message, name:users[socket.id]}) //user-->users
    });
})