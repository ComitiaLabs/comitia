import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useGetChatList from '@/hook/useGetChatList';
import { validPath } from '@/lib/routing';
import { paths } from '@/router';
import { useMediaQuery } from '@uidotdev/usehooks';
import { CircleUserRound, Menu, PenSquare } from 'lucide-react';
import { useState } from 'react';
import { Link, useOutlet, useParams } from 'react-router-dom';

const MenuMd = () => {
  const { data } = useGetChatList();
  const { id: currentPage } = useParams();

  return (
    <div className="p-3 bg-secondary grid grid-rows-[min-content_1fr_min-content] flex-col items-stretch gap-2 h-full">
      <div>
        <div className="text-center">
          <span className="text-lg font-semibold text-foreground">Comitia</span>
        </div>
        <Button
          className="w-full flex justify-between"
          disabled
          variant="ghost"
        >
          Create New Chat
          <PenSquare className="w-4 h-4" />
        </Button>
      </div>

      <div>
        {data?.map(item => {
          const isSelected = item.id === currentPage;
          return (
            <Button
              key={item.id}
              className="w-full"
              variant={isSelected ? 'default' : 'outline'}
              asChild
            >
              <Link to={validPath(paths.chat_with_id, { id: item.id })}>
                {item.name}
              </Link>
            </Button>
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

const MenuSm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0 bg-secondary" side={'left'}>
        <MenuMd />
      </SheetContent>
    </Sheet>
  );
};

const Chat = () => {
  const outlet = useOutlet();
  const isMDDevice = useMediaQuery('only screen and (min-width: 768px)');

  return (
    <div className="h-full grid grid-rows-[min-content_1fr] md:grid-rows-none md:grid-cols-4 xl:grid-cols-8">
      {isMDDevice ? (
        <MenuMd />
      ) : (
        <>
          <div className="p-2 grid grid-cols-3">
            <div>
              <MenuSm />
            </div>

            <div className="text-center">
              <span className="text-lg font-semibold text-foreground">
                Comitia
              </span>
            </div>

            <div />
          </div>
        </>
      )}

      <div className="col-span-full md:col-start-2 p-3 lg:px-16 xl:px-60 2xl:px-96 h-full flex flex-col justify-between">
        {outlet || 'Please select a chat from the sidebar'}
      </div>
    </div>
  );
};

export default Chat;
