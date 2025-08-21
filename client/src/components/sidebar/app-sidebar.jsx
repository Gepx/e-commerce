import { Home, UserRoundPen, MapPinHouse, History, Package, Users, BarChart3 } from 'lucide-react';
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
import { useAuth } from '@/context/AuthContext';
import { SidebarSeparator } from '../ui/sidebar';

const profileMenuItems = [
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
  }
];

const adminMenuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: BarChart3
  },
  {
    title: 'User Management',
    url: '/admin/users',
    icon: Users
  },
  {
    title: 'Product Management',
    url: '/admin/products',
    icon: Package
  }
];

export function AppSidebar() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
        <SidebarContent className="p-0">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = isAdminPage ? adminMenuItems : profileMenuItems;

  return (
    <Sidebar className="border-r-0 max-w-[250px]">
      <SidebarContent className="flex flex-col h-screen p-0">
        <SidebarGroup className="px-0 flex-1 flex flex-col">
          {/* Header Section */}
          <div className="flex-shrink-0 overflow-hidden">
            <SidebarGroupLabel className="text-xl sm:text-2xl font-bold text-black bg-clip-text mb-0 px-4 py-1 h-auto">
              {isAdminPage ? 'Admin Panel' : 'User Profile'}
            </SidebarGroupLabel>
            <SidebarSeparator className="my-0" />
          </div>

          {/* Menu Items */}
          <SidebarGroupContent className="flex-1 px-0 py-1 overflow-hidden">
            <SidebarMenu className="px-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide py-1">
                  {isAdminPage ? 'Operation' : 'Navigation'}
                </h2>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`
    group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
    transition-colors duration-150 ease-in-out
    ${
      location.pathname === item.url
        ? 'text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/50'
    }
  `}>
                        <div
                          className={`
    flex items-center justify-center h-6 w-6 rounded-md
    transition-colors duration-150 ease-in-out
    ${
      location.pathname === item.url
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600'
    }
  `}>
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                        </div>

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>

          {/* User Profile Section - Fixed at bottom */}
          <div className="flex-shrink-0 p-2 border-t border-gray-200 dark:border-gray-700 overflow-x-hidden">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              <div className="relative w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-gray-200 dark:text-gray-200 text-xs font-bold">
                  {(user?.username?.[0] || user?.email?.[0] || '?').toUpperCase()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {user?.username ?? 'User'}
                </p>
                <p className="text-xs text-slate-100 dark:text-slate-400 truncate">
                  {user?.email ?? 'No email'}
                </p>
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
