/**
 * Socket.io handler for chat functionality.
 * Handles user connections, message sending, and contact updates.
 *
 * @param {Object} io - The Socket.io server instance.
 */

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    socket.on('join', ({ roomId }) => {
       console.log(`User joined room: ${roomId}`);
      socket.join(roomId);
     
    });

    socket.on('sendMessage', (data) => {
      console.log(`sendMessage: ${data}`);
      io.to(data.chatRoom).emit('receiveMessage', data);
    });


    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};
