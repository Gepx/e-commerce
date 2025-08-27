import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@radix-ui/react-navigation-menu';
import { Bell, CircleUserRound, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const DesktopNav = () => (
  <NavigationMenu>
    <NavigationMenuList className="hidden md:flex items-center gap-5">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:bg-gray-400/30 p-2 rounded-md transition">
            <ShoppingCart />
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/notification"
            className="flex items-center gap-2 hover:bg-gray-400/30 p-2 rounded-md transition">
            <Bell />
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/account"
            className="flex items-center gap-2 hover:bg-gray-400/30 p-2 rounded-md transition">
            <CircleUserRound />
            <span>Egip</span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default DesktopNav;
