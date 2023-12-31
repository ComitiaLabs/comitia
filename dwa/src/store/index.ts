import type { ProtocolDefinition } from '@tbd54566975/dwn-sdk-js';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const DID_STORAGE_KEY = 'did';
export const didAtom = atomWithStorage<string | undefined>(DID_STORAGE_KEY, undefined, {
  getItem: async (key, initialValue) => {
    if (typeof window === 'undefined') return undefined;

    const value = localStorage.getItem(key);
    if (!value) return '';
    return value ? value : initialValue;
  },
  setItem: async (key, newValue) => {
    if (typeof window === 'undefined') return undefined;
    if (newValue === undefined) return undefined;

    localStorage.setItem(key, newValue);
    return undefined;
  },
  removeItem: async (key) => {
    if (typeof window === 'undefined') return undefined;

    localStorage.removeItem(key);
    return undefined;
  }
});

const PROTOCOL_STORAGE_KEY = 'protocol';
export const protocolAtom = atomWithStorage<ProtocolDefinition | undefined>(
  PROTOCOL_STORAGE_KEY,
  undefined
);

export type Chat = { message: string; isMe: boolean };
export const chatsAtom = atom<Chat[]>([]);
export type Action = { type: 'add'; payload: Chat[] } | { type: 'update_last'; payload: Chat };
export const updateChatsAtom = atom<Chat[], [Action], void>(
  (get) => get(chatsAtom),
  (get, set, action) => {
    const chats = get(chatsAtom);
    switch (action.type) {
      case 'add': {
        set(chatsAtom, [...chats, ...action.payload]);
        break;
      }
      case 'update_last': {
        const length = chats.length;
        if (length === 0) return;
        const last = chats[length - 1];

        set(chatsAtom, [...chats.slice(0, length - 1), { ...last, ...action.payload }]);
        break;
      }
    }
  }
);

export const inputFieldAtom = atom<string>('');
export const inputFieldRefAtom = atom<HTMLTextAreaElement | null>(null);
