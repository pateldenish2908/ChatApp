import { io, Socket } from 'socket.io-client';

const URL = "http://localhost:5000"; 

export const socket: Socket = io(URL, {
  autoConnect: true,
  transports: ['websocket'],
  withCredentials: true,
});

// Socket message types you can strongly type like:
// socket.emit<Message>('send_message', data);
