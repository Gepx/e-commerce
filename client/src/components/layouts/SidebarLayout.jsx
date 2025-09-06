import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/common/sidebar/app-sidebar';
import { Outlet } from 'react-router-dom';

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-white">
        <SidebarTrigger className="ml-4 mt-2" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
