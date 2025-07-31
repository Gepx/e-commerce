import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import MobileNav from './MobileNav';
import SearchBar from './SearchBar';
import DesktopNav from './DekstopNav';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';

const NavBar = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-white text-black ubuntu-font w-full border-b border-gray-400">
      <Link to="/" className="text-5xl">
        SHOP
      </Link>
      <SearchBar />
      <DesktopNav />

      <DropdownMenu open={hamburgerMenu} onOpenChange={setHamburgerMenu}>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            {hamburgerMenu ? <X /> : <Menu />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-screen rounded-t-none mt-1 bg-white shadow-lg">
          <DropdownMenuItem asChild>
            <MobileNav />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavBar;
