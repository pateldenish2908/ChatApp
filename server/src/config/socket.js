let io;
const { Server } = require('socket.io');
const cookie = require('cookie');
const { sendMessage } = require('../services/message.service');
const { verifyAccessToken } = require('../utils/jwt.util');

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Middleware to verify token from cookie
  io.use((socket, next) => {
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error('No cookies found'));
    }

    const parsed = cookie.parse(rawCookie);
    const token = parsed.accessToken; // Or whatever key you use

    if (!token) {
      return next(new Error('Token not found in cookies'));
    }

    try {
      const decoded = verifyAccessToken(token);
      socket.data.userId = decoded.id; // or decoded.userId
      next();
    } catch (err) {
      console.error('JWT Verification Error:', err);
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    console.log('User connected:', socket.data.userId);

    socket.on('join', ({ roomId }) => {
      console.log(`User joined room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on('leave', ({ roomId }) => {
      console.log(`User leave room: ${roomId}`);
      socket.leave(roomId);
    });

    socket.on('sendMessage', async (data) => {
      console.log('sendMessage', data);

      // const senderId=   socket.data.userId // from middleware

      const { chatRoom, senderId, content } = data;
      const message = await sendMessage(chatRoom, senderId, content);

      io.to(chatRoom).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });

    // socket.onAny((event, ...args) => {
    //   console.log(`Received event: ${event}`, args);
    // });
  });
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

module.exports = { initSocket, getIO };
