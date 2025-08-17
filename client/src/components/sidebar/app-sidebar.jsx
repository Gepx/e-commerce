import { Home, LogOut, UserRoundPen, MapPinHouse, History } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home
  },
  {
    title: 'Account',
    url: '/account',
    icon: UserRoundPen
  },
  {
    title: 'Address',
    url: '/address',
    icon: MapPinHouse
  },
  {
    title: 'Order History',
    url: '/order-history',
    icon: History
  },
  {
    title: 'Logout',
    url: '/logout',
    icon: LogOut
  }
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      location.pathname === item.url
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : ''
                    }`}>
                    <Link to={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
