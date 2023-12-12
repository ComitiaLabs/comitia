import { io } from 'socket.io-client';
import { env } from '../env';

export const socket = io(env.VITE_WS_URL, { autoConnect: false });
