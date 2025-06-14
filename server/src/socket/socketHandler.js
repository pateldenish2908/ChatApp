const Message = require('../models/message.model');
const Contact = require('../models/contact.model');
/**
 * Socket.io handler for chat functionality.
 * Handles user connections, message sending, and contact updates.
 * 
 * @param {Object} io - The Socket.io server instance.
 */

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);0

    socket.on('join', ({ contactId }) => {
      socket.join(`chat-${contactId}`);
      console.log(`Joined room chat-${contactId}`);
    });

    socket.on('message', async ({ contactId, text, senderId }) => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const message = new Message({ contactId, text, senderId, time, read: senderId === 'current-user' });
      await message.save();

      io.to(`chat-${contactId}`).emit('message', message);

      const contact = await Contact.findById(contactId);
      if (contact) {
        contact.lastMessage = text;
        contact.time = time;
        await contact.save();
        io.emit('contactUpdate', contact);
      }

      // Simulated response
      if (senderId === 'current-user') {
        setTimeout(async () => {
          const responses = ['Great!', 'Cool.', 'Let me think.', 'Thanks!', 'No worries.'];
          const randomText = responses[Math.floor(Math.random() * responses.length)];
          const botMessage = new Message({
            contactId,
            text: randomText,
            senderId: contactId,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false,
          });
          await botMessage.save();
          io.to(`chat-${contactId}`).emit('message', botMessage);

          contact.lastMessage = randomText;
          contact.time = botMessage.time;
          await contact.save();
          io.emit('contactUpdate', contact);
        }, 1000);
      }
    });

    socket.on('markAsRead', async ({ contactId }) => {
      await Message.updateMany({ contactId, read: false }, { read: true });
      const messages = await Message.find({ contactId });
      io.to(`chat-${contactId}`).emit('messagesRead', messages);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
};
