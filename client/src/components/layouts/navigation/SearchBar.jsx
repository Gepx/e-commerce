import { SearchIcon } from 'lucide-react';
import { Input } from '../../ui/input';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSearchQuery(params.get('search') || '');
  }, [params]);

  const onSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query.length === 0) {
      navigate('/');
    } else {
      navigate(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="hidden sm:flex items-center border border-gray-300 p-1 rounded-md w-1/2 focus-within:border-black">
      <SearchIcon className="text-gray-500" />
      <Input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        className="flex-1 border-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="hidden" aria-label="Search" />
    </form>
  );
};

export default SearchBar;
