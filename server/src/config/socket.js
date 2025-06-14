let io;

function initSocket(server) {
    const { Server } = require("socket.io");
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);

        socket.on('chat-message', (msg) => {
            console.log('Message received:', msg);
            io.emit('chat-message', msg); // broadcast
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });
}

function getIO() {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
}

module.exports = { initSocket, getIO };
