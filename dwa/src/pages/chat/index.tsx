import { Button } from '@/components/ui/button';
import useGetChatList from '@/hook/useGetChatList';
import { validPath } from '@/lib/routing';
import { paths } from '@/router';
import { CircleUserRound, PenSquare } from 'lucide-react';
import { Link, useOutlet, useParams } from 'react-router-dom';

const Menu = () => {
  const { data } = useGetChatList();
  const { id: currentPage } = useParams();

  return (
    <div className="p-3 bg-gray-200 grid grid-rows-[min-content_1fr_min-content] flex-col items-stretch gap-2">
      <Button className="w-full flex justify-between" disabled variant="ghost">
        Create New Chat
        <PenSquare className="w-4 h-4" />
      </Button>

      <div>
        {data?.map(item => {
          const isSelected = item.id === currentPage;
          return (
            <Link
              key={item.id}
              to={validPath(paths.chat_with_id, { id: item.id })}
            >
              <Button
                className="w-full"
                variant={isSelected ? 'default' : 'secondary'}
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>

      <Button className="w-full flex justify-between" disabled variant="ghost">
        <CircleUserRound className="w-4 h-4" />
        Your Profile
      </Button>
    </div>
  );
};

const Chat = () => {
  const outlet = useOutlet();

  return (
    <div className="h-full grid grid-cols-8">
      <Menu />

      <div className="col-span-full col-start-2  p-3 h-full flex flex-col justify-between">
        {outlet || 'Please select a chat from the sidebar'}
      </div>
    </div>
  );
};

export default Chat;
