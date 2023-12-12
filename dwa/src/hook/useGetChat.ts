import { updateChatsAtom } from '@/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import useSubscription from './useSubscription';

const useGetChat = () => {
  const [chats, setChats] = useAtom(updateChatsAtom);
  type Chat = (typeof chats)[number];

  const [isThinking, setIsThinking] = useState(false);
  const [loading, setLoading] = useState(true);

  const send = (message: string) => {
    setLoading(true);

    const newMessage: Chat = { message, isMe: true };
    const newResponse: Chat = { message: '', isMe: false };
    setChats({ type: 'add', payload: [newMessage, newResponse] });

    socket.emit('message', message);
    setIsThinking(true);
  };

  const { socket } = useSubscription();

  const updateChat = (response: string) => {
    if (response.length <= 0) return;
    const newResponse: Chat = { message: response, isMe: false };
    setChats({ type: 'update_last', payload: newResponse });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return {
    chats,
    loading,
    isThinking,
    send,
  };
};

export default useGetChat;
