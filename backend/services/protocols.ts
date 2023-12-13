import type { ProtocolDefinition } from '@tbd54566975/dwn-sdk-js';
import logger, { didPrint } from '../config/logger';
import Web5Service from './web5';

/**
 * Protocol defining structure of the data we store in User DWNs
 */
export const protocolDefinition = {
  protocol: 'https://comitia-help.com/protocol',
  published: true,
  types: {
    messagerecords: {
      schema: 'https://comitia-help.com/protocol/messagerecords',
      dataFormats: ['application/json']
    },
    healthrecords: {
      schema: 'https://comitia-help.com/protocol/healthrecords',
      dataFormats: ['application/json']
    },
    context: {
      schema: 'https://comitia-help.com/protocol/context',
      dataFormats: ['text/plain']
    }
  },
  structure: {
    messagerecords: {
      $actions: [
        { who: 'anyone', can: 'write' },
        { who: 'author', of: 'messagerecords', can: 'read' },
        { who: 'recipient', of: 'messagerecords', can: 'read' }
      ]
    },
    healthrecords: {
      $actions: [
        { who: 'anyone', can: 'write' },
        { who: 'author', of: 'healthrecords', can: 'read' },
        { who: 'recipient', of: 'healthrecords', can: 'read' }
      ]
    },
    context: {
      $actions: [
        { who: 'author', of: 'context', can: 'read' },
        { who: 'anyone', can: 'write' },
        { who: 'author', of: 'context', can: 'read' },
        { who: 'recipient', of: 'context', can: 'read' }
      ]
    }
  }
} satisfies ProtocolDefinition;

type ProtocolSchemas = 'healthrecords' | 'context' | 'messagerecords';

export async function validateDIDHasProtocol(did: string) {
  const { web5 } = Web5Service;

  if (!web5) {
    throw new Error('Web5 service not initialized');
  }

  logger.info(`Validating DID has protocol - ${didPrint(did)}`);

  try {
    const response = await web5.dwn.protocols.query({
      from: did,
      message: {
        filter: {
          protocol: 'https://comitia-help.com/protocol'
        }
      }
    });

    return response.protocols.length > 0;
  } catch (error) {
    logger.error('DID Protocol Install Validation Error:', error);
    // This is most likely not an internal error, but rather a validation error
    return false;
  }
}

export async function fetchRecords(did: string, schema: ProtocolSchemas) {
  const { web5 } = Web5Service;

  if (!web5) {
    throw new Error('Web5 service not initialized');
  }

  const response = await web5.dwn.records.query({
    from: did,
    message: {
      filter: {
        schema: 'https://comitia-help.com/protocol/' + schema
      }
    }
  });

  return response.records;
}

export async function writeRecords(
  did: string,
  { schema, data }: { schema: ProtocolSchemas; data: unknown }
) {
  const { web5 } = Web5Service;

  if (!web5) {
    throw new Error('Web5 service not initialized');
  }

  const { record, status } = await web5.dwn.records.write({
    store: false,
    data,
    message: {
      dataFormat: 'application/json',
      protocol: protocolDefinition.protocol,
      schema: `${protocolDefinition.protocol}/${schema}`,
      protocolPath: schema
    }
  });

  if (!record || status.code >= 400) {
    throw new Error('Record not created: ' + status.detail);
  }

  const { status: sendStatus } = await record.send(did);

  if (sendStatus.code >= 400) {
    throw new Error('Record not written: ' + sendStatus.detail);
  }

  return status;
}
