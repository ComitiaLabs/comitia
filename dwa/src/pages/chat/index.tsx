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
      <Window />
    </div>
  );
};

export default Chat;
