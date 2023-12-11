import { Server } from 'socket.io';
import logger, { didPrint } from '../config/logger';
import { ChatSession } from '../services/chat';

export function handleChat(io: Server) {
  io.on('connection', async (socket) => {
    const session = new ChatSession(socket.data.did);

    try {
      await session.initialize();
      socket.emit('ready', 'Chat session is ready');
    } catch (error) {
      logger.error('Failed to initialize chat session', error);
      socket.emit('error', 'Failed to initialize chat session');
    }

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
      logger.info(`User ${didPrint(socket.data.did)} disconnected`);
    });
  });
}
