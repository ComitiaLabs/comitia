import { ProtocolDefinition } from '@tbd54566975/dwn-sdk-js';
import { Web5 } from '@web5/api';

export const validateDIDHasProtocol = async (
  web5: Web5,
  protocol: ProtocolDefinition,
) => {
  const response = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: `${protocol?.protocol}`,
      },
    },
  });

  return response.protocols.length > 0;
};

export const installProtocols = async (
  web5: Web5,
  protocolDefinition: ProtocolDefinition,
) => {
  const hasProtocol = await validateDIDHasProtocol(web5, protocolDefinition);

  if (hasProtocol) return;

  return await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });
};

export const getWeb5Instance = async (did?: string) => {
  const { web5 } = await Web5.connect({ connectedDid: did });
  if (!web5) {
    throw new Error('Failed to get web5 instance');
  }
  return web5;
};

export const handleAuth = async (
  protocol: ProtocolDefinition,
  did?: string,
) => {
  const web5 = await getWeb5Instance(did);
  await installProtocols(web5, protocol);
};
