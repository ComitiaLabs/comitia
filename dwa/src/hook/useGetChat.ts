import { useEffect, useState } from 'react';
import useSubscription from './useSubscription';

export type Chat = { message: string; isMe: boolean };

const useGetChat = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);

  const send = (message: string) => {
    setLoading(true);
    socket.emit('message', message);

    const newMessage: Chat = { message, isMe: true };
    setChats(prev => [...prev, newMessage]);

    setIsThinking(true);
  };

  const { socket } = useSubscription();

  useEffect(() => {
    socket.on('response', function (response) {
      console.log('chat response:', response);

      if (message.length <= 0) return;

      const newMessage: Chat = { message: response, isMe: false };
      setChats(prev => [...prev, newMessage]);

      setLoading(false);
      setIsThinking(false);
    });
    socket.on('ready', function (response) {
      console.log('chat ready:', response);
      setLoading(false);
    });

    return () => {
      socket.off('response');
      socket.off('ready');
    };
  }, [socket]);

  return { chats, loading, send, isThinking };
};

export default useGetChat;
