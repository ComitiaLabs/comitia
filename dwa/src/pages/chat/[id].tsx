import { useParams } from 'react-router-dom';

const Chat = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default Chat;
