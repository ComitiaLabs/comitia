import { getMessages } from '@/lib/web5Tools';
import { Chat, protocolAtom, updateChatsAtom } from '@/store';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import useSubscription from './useSubscription';
import { usePostHog } from 'posthog-js/react';

const handleChatParse = (messages: Awaited<ReturnType<typeof getMessages>>): Chat[] => {
  return messages.map((message) => ({
    message: message.content,
    isMe: message.type === 'human'
  }));
};

const useGetChat = () => {
  const posthog = usePostHog();
  const protocol = useAtomValue(protocolAtom);
  const [chats, setChats] = useAtom(updateChatsAtom);

  const [chatReady, setChatReady] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const send = (message: string) => {
    setLoading(true);

    const newMessage: Chat = { message, isMe: true };
    const newResponse: Chat = { message: '', isMe: false };
    setChats({ type: 'add', payload: [newMessage, newResponse] });

    socket.emit('message', message);
    posthog?.capture('send_message');

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
      posthog?.capture('chat_ready');
      console.log('chat ready:', response);
      setChatReady(true);
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

  useEffect(() => {
    if (chatReady) {
      getMessages(protocol?.protocol)
        .then(async (messages) => {
          const parsedMessages = handleChatParse(messages);
          setChats({ type: 'add', payload: parsedMessages });
          setLoading(false);
        })
        .finally(() => {
          setLoadingMessages(false);
        });
    }
  }, [chatReady, protocol, setChats]);

  return {
    chats,
    loading,
    loadingMessages,
    isThinking,
    send
  };
};

export default useGetChat;
