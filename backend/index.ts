import app from './app';
import config from './config/config';
import logger from './config/logger';
import Web5Service from './services/web5';

// Express server initialization
const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

Web5Service.connect().then(() => {
  logger.info('Web5 service connected');
});

// Exception handling
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

function unexpectedErrorHandler(error: unknown) {
  logger.error(error);
  exitHandler();
}

function exitHandler() {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}
