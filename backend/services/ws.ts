import type { Server } from 'socket.io';

import { validateDIDHasProtocol } from './protocols';
import { handleChat } from '../controller/chat.controller';

export async function initializeWS(io: Server) {
  // Middleware to validate DID
  io.use(async (socket, next) => {
    const { did } = socket.handshake.auth; // Reference: https://socket.io/docs/v4/middlewares/#sending-credentials

    if (!did) {
      return next(new Error('No DID provided'));
    }

    const isValidDID = await validateDIDHasProtocol(did);

    if (!isValidDID) {
      return next(new Error('DID does not have required protocol. Install it from /protocols.'));
    }

    // Add user to room
    socket.join(did);

    socket.data.did = did;

    next();
  });

  handleChat(io);
}
