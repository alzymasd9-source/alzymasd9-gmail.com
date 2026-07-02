const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg; // إعادة بث الرسالة لكل المتصفحات المتصلة
    });
});

http.listen(3000, () => {
    console.log('السيرفر يعمل على المنفذ: http://localhost:3000');
});
