import NavBar from '@/components/navigation/NavBar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="transition-all duration-200 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
