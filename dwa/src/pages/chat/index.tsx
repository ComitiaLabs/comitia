import Chat from '@/components/chat';
import ProfileMenu from '@/components/profileMenu';
import Splash from '@/components/splashes';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useGetChatList from '@/hook/useGetChatList';
import { paths } from '@/router';
import { useMediaQuery } from '@uidotdev/usehooks';
import { DownloadCloud, Menu, PenSquare } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type MenuProps = {
  className?: string;
};
const MenuMd = ({ className = '' }: MenuProps) => {
  const { data } = useGetChatList();
  const { id: currentPage } = useParams();

  return (
    <div
      className={`p-3 bg-white grid grid-rows-[min-content_1fr_min-content] flex-col items-stretch gap-2 h-full ${className}`}
    >
      <div className="flex gap-2 flex-col">
        <Button className="w-full flex justify-between" disabled variant="outline">
          Create New Chat
          <PenSquare className="w-4 h-4" />
        </Button>
        <Separator />
      </div>

      <div>
        {data?.map((item) => {
          const isSelected = item.id === currentPage;
          return (
            <Button
              key={item.id}
              className="w-full justify-start"
              variant={isSelected ? 'default' : 'outline'}
              asChild
            >
              <Link to={paths.chat}>{item.name}</Link>
            </Button>
          );
        })}
      </div>

      <div className="flex gap-2 flex-col">
        <Separator />
        <Button
          className="w-full flex items-center justify-between gap-2"
          variant="secondary"
          disabled
        >
          Download Records
          <DownloadCloud className="w-4 h-4" />
        </Button>
        <ProfileMenu />
      </div>
    </div>
  );
};

const MenuSm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0 bg-secondary" side={'left'}>
        <MenuMd className="pt-12" />
      </SheetContent>
    </Sheet>
  );
};

const Wrapper = () => {
  const isMDDevice = useMediaQuery('only screen and (min-width: 768px)');

  return (
    <div className="h-full grid grid-rows-[min-content_1fr] md:grid-cols-[max(0px,_15rem)_1fr] xl:grid-cols-[max(0px,_20rem)_1fr] md:grid-rows-none bg-secondary relative isolate overflow-hidden">
      <Splash />

      {isMDDevice ? (
        <div className="p-3">
          <MenuMd className="rounded-lg overflow-hidden" />
        </div>
      ) : (
        <>
          <div className="p-2 grid grid-cols-3">
            <div>
              <MenuSm />
            </div>

            <div className="flex flex-col items-center">
              <img className="w-12 h-12 mr-1" src="/comitia-logo-transparent.png" />
            </div>

            <div />
          </div>
        </>
      )}

      <div className="p-3 h-full flex flex-col justify-between overflow-auto 2xl:px-80">
        <Chat />
      </div>
      <Splash />
    </div>
  );
};

export default Wrapper;
