import Web5Service from '../services/web5';
import asyncHandler from 'express-async-handler';

/**
 * Returns the DID of this application.
 * Allows client applications to access the protocols in the DWN.
 */
export const getIdentity = asyncHandler(async (_, res) => {
  res.send(Web5Service.did);
});
