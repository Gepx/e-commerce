import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    <nav className="flex items-center justify-between py-4 px-8 bg-white/95 backdrop-blur-sm text-black ubuntu-font w-full border-b border-gray-200 shadow-sm relative z-50">
      <Link
        to="/"
        className="text-5xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
        SHOP
      </Link>
      <SearchBar />
      <DesktopNav />

      <DropdownMenu open={hamburgerMenu} onOpenChange={setHamburgerMenu}>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="transition-all duration-200 hover:bg-gray-100">
            <div className="relative w-5 h-5">
              <Menu
                className={`absolute transition-all duration-300 ${
                  hamburgerMenu ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
              />
              <X
                className={`absolute transition-all duration-300 ${
                  hamburgerMenu ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`}
              />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-screen rounded-t-none bg-white shadow-lg border-t-0 animate-in slide-in-from-top-2 duration-200"
          sideOffset={20}>
          <DropdownMenuItem asChild>
            <MobileNav />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavBar;
