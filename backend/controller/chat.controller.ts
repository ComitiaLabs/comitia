import { Server } from 'socket.io';

export function handleChat(io: Server) {
  io.on('connection', async (socket) => {
    console.log(`User ${socket.data.did} connected`);

    // Handle chat setup here

    // Emit ready event to client
    socket.emit('ready');

    // Handle chat messages here

    // Handle chat teardown here
    socket.on('disconnect', () => {
      console.log(`User ${socket.data.did} disconnected`);
    });
  });
}
