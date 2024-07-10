import useLogout from '@/hook/useLogout';
import { DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { BookUser, CircleUserRound, LogOut, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from '../ui/dropdown-menu';
import { usePostHog } from 'posthog-js/react';

const ProfileMenu = () => {
  const posthog = usePostHog();
  const logout = useLogout();

  const openProfile = () => {
    posthog?.capture('open_profile');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full flex items-center justify-between" variant="ghost">
          <div className="flex gap-2 items-center">
            <CircleUserRound className="w-4 h-4" />
            John Doe
          </div>

          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled onClick={openProfile}>
          <div className="w-full flex items-center gap-2">
            <BookUser className="w-4 h-4" />
            Profile
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <div className="w-full flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
