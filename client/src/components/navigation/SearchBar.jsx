import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';

const SearchBar = () => (
  <div className="hidden sm:flex items-center border border-gray-300 p-1 rounded-md w-1/2 focus-within:border-black">
    <SearchIcon className="text-gray-500" />
    <Input
      type="text"
      placeholder="Search"
      className="flex-1 border-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
    />
  </div>
);

export default SearchBar;
