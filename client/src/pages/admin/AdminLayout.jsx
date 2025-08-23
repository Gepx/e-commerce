import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import AlertWrapper from '@/components/alert-wrapper/alert-wrapper';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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

              <AlertWrapper
                onAction={handleLogout}
                title="Are You Sure?"
                description="You will be logged out from the system after you click Log Out button"
                actionText="Log Out"
                cancelText="Cancel"
                actionClassName="bg-red-500 cursor-pointer hover:bg-red-600">
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-red-500 cursor-pointer hover:bg-red-600">
                  Log Out
                </Button>
              </AlertWrapper>
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
