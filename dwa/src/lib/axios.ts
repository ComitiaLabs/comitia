import { env } from '@/env';
import { ProtocolDefinition } from '@tbd54566975/dwn-sdk-js';
import axios from 'axios';

export const fetchProtocol = async (
  cb: (protocol: ProtocolDefinition) => void,
  errCb?: (err: unknown) => void,
) => {
  try {
    const url = new URL(`${env.VITE_WS_URL}/protocols`);
    const response = await axios.get<ProtocolDefinition>(url.toString());

    cb(response.data);
  } catch (error) {
    console.error('Error fetching protocol', error);
    errCb?.(error);
  }
};
