import { Button } from '@/components/ui/button';
import useGetChatList from '@/hook/useGetChatList';
import { validPath } from '@/lib/routing';
import { paths } from '@/router';
import { Link, Outlet, useParams } from 'react-router-dom';

const Menu = () => {
  const { data } = useGetChatList();
  const { id: currentPage } = useParams();

  return (
    <div className="p-3 bg-blue-200 flex flex-col items-stretch gap-2">
      {data?.map(item => {
        const isSelected = item.id === currentPage;

        return (
          <Link to={validPath(paths.chat_with_id, { id: item.id })}>
            <Button
              className="w-full"
              key={item.id}
              variant={isSelected ? 'default' : 'secondary'}
            >
              {item.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

const Chat = () => {
  return (
    <div className="h-full grid grid-cols-5">
      <Menu />

      <div className="col-span-4 p-3 h-full flex flex-col justify-between">
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
