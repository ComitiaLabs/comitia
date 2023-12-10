import { useState } from 'react';

const useGetChatList = () => {
  const [loading] = useState(false);

  const data = [
    { id: '1', name: 'Chat 1' },
    { id: '2', name: 'Chat 2' },
    { id: '3', name: 'Chat 3' },
  ];

  return {
    loading,
    data,
  };
};

export default useGetChatList;
