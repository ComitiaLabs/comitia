import asyncHandler from 'express-async-handler';

import { protocolDefinitions } from '../services/protocols';

/**
 * Returns the required protocols for the application in JSON.
 */
export const getProtocols = asyncHandler(async (_, res) => {
  res.status(200).json(protocolDefinitions);
});
