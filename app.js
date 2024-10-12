const express = require("express");
const http = require("http");
const path = require("path");
const socket = require('socket.io')

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = socket(server);
io.on('connection', (socket) => {
    console.log("Connected...")
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})


app.use(express.static(path.join(__dirname, "/public")))
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

server.listen(PORT, () => {
    console.log(`Server Is Start Now ${PORT} `)
})