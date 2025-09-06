import NavBar from '@/components/layouts/navigation/NavBar';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="transition-all duration-200 ease-in-out">
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default RootLayout;
