let express = require('express');
let socket = require('socket.io');

let PORT = 3000;

let app = express();

let server = app.listen(PORT,()=>{
    console.log(`server listening on port: ${PORT}`);
})

app.use(express.static('public'));

let io = socket(server);

io.on("connection",(socket)=>{
    console.log(`connection established with: ${socket.id}`);

    socket.on('message',(data)=>{
        io.sockets.emit('message',data)
    })
})