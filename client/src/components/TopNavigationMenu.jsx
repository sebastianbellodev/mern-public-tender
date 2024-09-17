/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/data/AuthContext.jsx';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import ModeToggle from '@/components/mode-toggle';

function TopNavigationMenu() {
  const { authenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <nav className="flex items-baseline justify-between h-fit w-screen shadow-md py-5 px-10 sm:px-11 md:px-14 lg:px-28 fixed top-0 z-10 bg-light dark:bg-dark">
      <div className="flex items-baseline gap-6">
        <ModeToggle></ModeToggle>
        <h1 className="text-sm font-extrabold tracking-tight lg:text-3xl">
          public/tender
        </h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {authenticated ? (
            <div className="flex items-center gap-3">
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm">
                Welcome <b>{user.username}</b>
              </p>
              <NavigationMenuItem
                className="cursor-pointer"
                onClick={() => logout()}
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign out
                </NavigationMenuLink>
              </NavigationMenuItem>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </NavigationMenuLink>
              </NavigationMenuItem>
            </div>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

export default TopNavigationMenu;
