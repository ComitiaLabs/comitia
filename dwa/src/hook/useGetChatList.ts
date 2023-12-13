import { useState } from 'react';

const useGetChatList = () => {
  const [loading] = useState(false);

  const [data] = useState([{ id: 'ai', name: 'AI Chat' }]);

  const isChatValid = (chatId: string | undefined) => {
    return data.some((chat) => chat.id === chatId);
  };

  return {
    loading,
    data,
    isChatValid
  };
};

export default useGetChatList;
