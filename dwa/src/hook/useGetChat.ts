import { useEffect, useState } from 'react';
import useSubscription from './useSubscription';

export type Chat = { message: string; isMe: boolean };

const useGetChat = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [block, setBlock] = useState(false);

  const send = (message: string) => {
    setLoading(true);
    setBlock(true);
    socket.emit('message', message);

    const newMessage: Chat = { message, isMe: true };
    setChats(prev => [...prev, newMessage]);

    setIsThinking(true);
  };

  const { socket } = useSubscription();

  useEffect(() => {
    socket.on('response', function (response: string) {
      if (response.length <= 0) return;

      const newMessage: Chat = { message: response, isMe: false };
      setChats(prev => [...prev, newMessage]);

      setLoading(false);
      setIsThinking(false);
    });
    socket.on('ready', function (response: string) {
      console.log('chat ready:', response);
      setLoading(false);
    });
    socket.on('response complete', function () {
      setLoading(false);
      setIsThinking(false);
      setBlock(false);
    });

    return () => {
      socket.off('response');
      socket.off('ready');
    };
  }, [socket]);

  return { chats, loading, send, isThinking, block };
};

export default useGetChat;
