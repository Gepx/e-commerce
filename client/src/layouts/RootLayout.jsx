import { Outlet } from 'react-router-dom';
import NavBar from '../components/navigation/NavBar';

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
