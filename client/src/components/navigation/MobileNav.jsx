import { Bell, CircleUserRound, SearchIcon, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';

const MobileNav = () => (
  <div className="z-10 flex flex-col block mt-4 md:hidden w-full">
    <Link
      to="/cart"
      className="flex items-center gap-2 hover:bg-gray-100 py-4 px-2 w-full border-b border-gray-300 shadow-none">
      <ShoppingCart />
      Cart
    </Link>
    <Link
      to="/notification"
      className="flex items-center gap-2 hover:bg-gray-100 py-4 px-2 w-full border-b border-gray-300 shadow-none">
      <Bell />
      Notifications
    </Link>
    <Link
      to="/profile"
      className="flex items-center gap-2 hover:bg-gray-100 py-4 px-2 w-full border-b border-gray-300 sm:border-black shadow-none">
      <CircleUserRound />
      Profile
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
