import { useEffect, useReducer, useState } from 'react';
import useSubscription from './useSubscription';

export type Chat = { message: string; isMe: boolean };

type State = Chat[];
type Action =
  | { type: 'add'; payload: Chat[] }
  | { type: 'update_last'; payload: Chat }
  | { type: 'remove' };
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add': {
      return [...state, ...action.payload];
    }
    case 'update_last': {
      const length = state.length;
      if (length === 0) return state;
      const last = state[length - 1];
      return [...state.slice(0, length - 1), { ...last, ...action.payload }];
    }
    case 'remove': {
      return state.slice(0, state.length - 1);
    }
    default:
      return state;
  }
};

const useGetChat = () => {
  const [chats, dispatch] = useReducer(reducer, []);
  const [isThinking, setIsThinking] = useState(false);
  const [loading, setLoading] = useState(true);

  const send = (message: string) => {
    setLoading(true);
    socket.emit('message', message);

    const newMessage: Chat = { message, isMe: true };
    const newResponse: Chat = { message: '', isMe: false };

    dispatch({ type: 'add', payload: [newMessage, newResponse] });

    setIsThinking(true);
  };

  const { socket } = useSubscription();

  const updateChat = (response: string) => {
    if (response.length <= 0) return;

    dispatch({
      type: 'update_last',
      payload: { message: response, isMe: false },
    });
  };

  useEffect(() => {
    socket.on('ready', function (response: string) {
      console.log('chat ready:', response);
      setLoading(false);
    });

    socket.on('response', updateChat);

    socket.on('response complete', function (response: string) {
      updateChat(response);
      setLoading(false);
      setIsThinking(false);
    });

    return () => {
      socket.off('response');
      socket.off('ready');
      socket.off('response complete');
    };
  }, [socket]);

  return {
    chats,
    loading,
    isThinking,
    send,
  };
};

export default useGetChat;
