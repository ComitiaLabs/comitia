import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { BookUser, CircleUserRound, DownloadCloud } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';

const ProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full flex justify-between" variant="ghost">
          <CircleUserRound className="w-4 h-4" />
          Your Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <div className="w-full flex items-center gap-2">
            <BookUser className="w-4 h-4" />
            Profile
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full flex items-center gap-2">
            <DownloadCloud className="w-4 h-4" /> Download Records
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;