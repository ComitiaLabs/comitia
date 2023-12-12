import { Server } from 'socket.io';
import logger, { didPrint } from '../config/logger';
import { ChatSession } from '../services/chat';

export function handleChat(io: Server) {
  io.on('connection', async (socket) => {
    logger.info(`User ${didPrint(socket.data.did)} connected`);
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
        const response = await session.ask(message);

        socket.emit('response', response);
      } catch (error) {
        console.error('An error occurred while processing your request', error);
        socket.emit('error', 'An error occurred while processing your request');
      }
    });

    // Handle chat teardown here
    socket.on('disconnect', async () => {
      logger.info(`User ${didPrint(socket.data.did)} disconnected`);
      try {
        await session.cleanup();
        logger.info(`Chat session for ${didPrint(socket.data.did)} cleaned up`);
      } catch (error) {
        logger.error(
          `Failed to cleanup chat session for conversation ${didPrint(socket.data.did)}`,
          error
        );
      }
    });
  });
}
