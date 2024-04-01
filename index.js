const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on("user-message", (message) => {
        console.log('Message received:', message);
        io.emit("Message", message);
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server started at PORT 9000`));
