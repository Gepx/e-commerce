import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@radix-ui/react-navigation-menu';
import { Bell, CircleUserRound, Heart, ShieldUser, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const DesktopNav = ({ user }) => (
  <NavigationMenu>
    <NavigationMenuList className="hidden md:flex items-center gap-5">
      {user?.role === 'admin' && (
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/admin"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 p-2 rounded-md transition">
              <ShieldUser className="w-5 h-5" />
              <span className="font-medium">Admin</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )}
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/wishlist"
            className="flex items-center gap-2 hover:bg-gray-400/30 p-2 rounded-md transition">
            <Heart className="hover:fill-red-700 transition-all duration-200" />
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
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
