import { Server } from 'socket.io';
import { ChatSession } from '../services/chat';

export function handleChat(io: Server) {
  io.on('connection', async (socket) => {
    const session = new ChatSession(socket.data.did);

    session
      .initialize()
      .then(() => {
        // Session is ready for chat
        socket.emit('ready', 'Chat session is ready');
      })
      .catch((error) => {
        console.error('Failed to initialize chat session', error);
        socket.emit('error', 'Failed to initialize chat session');
      });

    // Handle chat messages here
    socket.on('message', async (message: string) => {
      if (!session.isReady) {
        socket.emit('error', 'Chat session is not ready');
        return;
      }

      try {
        await session.ask(message, (response) => {
          socket.emit('response', response);
        });

        socket.emit('response complete');
      } catch (error) {
        socket.emit('error', 'An error occurred while processing your request');
      }
    });

    // Handle chat teardown here
    socket.on('disconnect', () => {
      console.log(`User ${socket.data.did} disconnected`);
    });
  });
}
