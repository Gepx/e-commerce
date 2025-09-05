import { Bell, CircleUserRound, Heart, SearchIcon, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';

const MobileNav = () => (
  <div className="relative flex flex-col md:hidden w-full ">
    <Link
      to="/wishlist"
      className="flex items-center gap-3 hover:bg-gray-50 py-4 px-4 w-full border-b border-gray-100 transition-colors duration-200">
      <Heart className="w-5 h-5" />
      <span className="font-medium">Wishlist</span>
    </Link>
    <Link
      to="/cart"
      className="flex items-center gap-3 hover:bg-gray-50 py-4 px-4 w-full border-b border-gray-100 transition-colors duration-200">
      <ShoppingCart className="w-5 h-5" />
      <span className="font-medium">Cart</span>
    </Link>
    <Link
      to="/notification"
      className="flex items-center gap-3 hover:bg-gray-50 py-4 px-4 w-full border-b border-gray-100 transition-colors duration-200">
      <Bell className="w-5 h-5" />
      <span className="font-medium">Notifications</span>
    </Link>
    <Link
      to="/account"
      className="flex items-center gap-3 hover:bg-gray-50 py-4 px-4 w-full border-b border-gray-100 transition-colors duration-200">
      <CircleUserRound className="w-5 h-5" />
      <span className="font-medium">Profile</span>
    </Link>
    <div className="flex items-center gap-2 border border-gray-300 rounded-md my-4 mx-2 p-2 w-[calc(100%-1rem)] sm:hidden">
      <SearchIcon className="text-gray-500" />
      <Input
        type="text"
        placeholder="Search"
        className="flex-1 border-none outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 shadow-none"
      />
    </div>
  </div>
);

export default MobileNav;
