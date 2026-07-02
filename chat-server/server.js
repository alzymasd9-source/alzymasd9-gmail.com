const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" } 
});

app.use(express.json());

io.on('connection', (socket) => {
    // عند دخول الغرفة
    socket.on('join-room', (roomId) => {
        socket.join(`room_${roomId}`);
        console.log(`User joined: room_${roomId}`);
    });

    // عند مغادرة الغرفة
    socket.on('leave-room', (roomId) => {
        socket.leave(`room_${roomId}`);
        console.log(`User left: room_${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// استقبال الرسالة المحفوظة من Laravel وبثها فوراً للمتصفحات
app.post('/broadcast-message', (req, res) => {
    const messageData = req.body;
    const roomId = messageData.chat_room_id;

    io.to(`room_${roomId}`).emit('new-message', messageData);
    return res.status(200).json({ success: true });
});

http.listen(3000, () => {
    console.log('سيرفر السوكيت يعمل بنجاح على المنفذ 3000');
});

