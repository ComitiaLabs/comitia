import { Outlet } from 'react-router-dom';

const Menu = () => {
  return <div>Menu</div>;
};

const Window = () => {
  return <div>Window</div>;
};

const Chat = () => {
  return (
    <div className="flex flex-row">
      <Menu />
      <Outlet />
      <Window />
    </div>
  );
};

export default Chat;
