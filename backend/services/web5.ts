import { Web5 } from '@web5/api';
import { webcrypto } from 'node:crypto';
import { protocolDefinitions } from './protocols';

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

    // Install protocols
    for (const protocol of protocolDefinitions) {
      await web5.dwn.protocols.configure({
        message: {
          definition: protocol
        }
      });
    }
  }
}

export default new Web5Service();
