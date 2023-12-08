import { Web5 } from '@web5/api';
import { webcrypto } from 'node:crypto';
import asyncHandler from 'express-async-handler';

// @ts-expect-error - polyfill
if (!globalThis.crypto) globalThis.crypto = webcrypto;

// The local agent does not cache these operations, so we do it here.
// https://github.com/TBD54566975/web5-js/issues/279
let cachedDid: string | null = null;

/**
 * Returns the DID of this application.
 * Allows client applications to access the protocols in the DWN.
 */
export const getIdentity = asyncHandler(async (_, res) => {
  if (cachedDid) {
    res.send(cachedDid);
    return;
  }

  const { did } = await Web5.connect();

  cachedDid = did;

  res.send(did);
});
