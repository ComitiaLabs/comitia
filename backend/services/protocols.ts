import type { ProtocolDefinition } from '@tbd54566975/dwn-sdk-js';
import logger from '../config/logger';
import Web5Service from './web5';

/**
 * Protocol defining structure of the data we store in User DWNs
 */
export const protocolDefinition = {
  protocol: 'https://comitia-help.com/protocol',
  published: true,
  types: {
    message_records: {
      schema: 'https://comitia-help.com/protocol/chat_records',
      dataFormats: ['application/json']
    },
    health_records: {
      schema: 'https://comitia-help.com/protocol/health_records',
      dataFormats: ['application/json']
    },
    context: {
      schema: 'https://comitia-help.com/protocol/context',
      dataFormats: ['text/plain']
    }
  },
  structure: {
    message_records: {
      $actions: [
        { who: 'author', of: 'message_records', can: 'read' },
        { who: 'author', of: 'message_records', can: 'write' },
        { who: 'recipient', of: 'message_records', can: 'read' },
        { who: 'recipient', of: 'message_records', can: 'write' }
      ]
    },
    health_records: {
      $actions: [
        { who: 'author', of: 'health_records', can: 'read' },
        { who: 'author', of: 'health_records', can: 'write' },
        { who: 'recipient', of: 'health_records', can: 'read' },
        { who: 'recipient', of: 'health_records', can: 'write' }
      ]
    },
    context: {
      $actions: [
        { who: 'author', of: 'context', can: 'read' },
        { who: 'author', of: 'context', can: 'write' },
        { who: 'recipient', of: 'context', can: 'read' },
        { who: 'recipient', of: 'context', can: 'write' }
      ]
    }
  }
} satisfies ProtocolDefinition;

type ProtocolSchemas =
  (typeof protocolDefinition.types)[keyof typeof protocolDefinition.types]['schema'];

export async function validateDIDHasProtocol(did: string) {
  const { web5 } = Web5Service;

  if (!web5) {
    throw new Error('Web5 service not initialized');
  }

  logger.info('Validating DID has protocol', did.slice(0, 20));

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

export async function fetchRecords(did: string, schema?: ProtocolSchemas) {
  const { web5 } = Web5Service;

  if (!web5) {
    throw new Error('Web5 service not initialized');
  }

  const response = await web5.dwn.records.query({
    from: did,
    message: {
      filter: {
        protocol: 'https://comitia-help.com/protocol',
        ...(schema && { schema })
      }
    }
  });

  return response.records;
}
