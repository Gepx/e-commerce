import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/common/sidebar/app-sidebar';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminLayout() {
  const { user, loading } = useAuth();

  if (!loading && (!user || user.role !== 'admin')) {
    return <Navigate to="/forbidden" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="z-30 flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear sticky top-0 bg-background md:px-6">
            <div className="flex w-full items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <SidebarTrigger className="cursor-pointer" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
