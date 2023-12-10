import { Web5 } from '@web5/api';
import { webcrypto } from 'node:crypto';
import { protocolDefinition } from './protocols';

// @ts-expect-error - polyfill
if (!globalThis.crypto) globalThis.crypto = webcrypto;

/**
 * Singleton for interacting with the Web5 service.
 * `connect` must be called before using the service.
 * The web5 instance here should be used for all interactions with the Web5 service.
 */

class Web5Service {
  did: string | null = null;
  web5: Web5 | null = null;

  async connect() {
    const { did, web5 } = await Web5.connect();

    this.did = did;
    this.web5 = web5;

    // Install protocol
    await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition
      }
    });
  }
}

export default new Web5Service();
