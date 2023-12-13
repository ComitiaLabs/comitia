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
  did: string,
) => {
  // TODO: Re-enable once protocol definition is stable
  // const hasProtocol = await validateDIDHasProtocol(web5, protocolDefinition);
  // if (hasProtocol) return;

  const instance = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });

  if (!instance.protocol) {
    throw new Error('Protocol instance not created');
  }

  await instance.protocol.send(did);
};

export const getWeb5Instance = async () => {
  const { web5, did } = await Web5.connect({});
  if (!web5) {
    throw new Error('Failed to get web5 instance');
  }
  return { web5, did };
};

export const handleClose = async () => {
  localStorage.clear();
};

export const handleAuth = async (
  protocol: ProtocolDefinition,
  setDid: (did: string) => void,
) => {
  const { web5, did } = await getWeb5Instance();
  setDid(did);
  await installProtocols(web5, protocol, did);
};

type Schema = 'messagerecords' | 'healthrecords';
export const getRecords = async (schema: Schema, protocol?: string) => {
  const { web5, did } = await getWeb5Instance();

  const response = await web5.dwn.records.query({
    from: did,
    message: {
      filter: {
        schema: `${protocol}/${schema}`,
      },
    },
  });

  return response.records ?? [];
};

export const getMessages = async (protocol?: string) => {
  return await getRecords('messagerecords', protocol);
};
