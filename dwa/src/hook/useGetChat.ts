import { useState } from 'react';

const useGetChat = (chatId: string) => {
  const [loading] = useState(false);
  const [chats] = useState([
    { id: '1', timestamp: 1, chatId, message: 'Hello', senderId: '1' },
    { id: '2', timestamp: 1, chatId, message: 'Hi', senderId: '2' },
    { id: '3', timestamp: 1, chatId, message: 'Bye', senderId: '1' },
  ]);
  return { chats, loading };
};

export default useGetChat;
