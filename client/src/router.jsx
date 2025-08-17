import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AuthLayout from './layouts/AuthLayout';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import Product from './components/product/Product';
import Profile from './pages/Profile';
import SidebarLayout from './layouts/SidebarLayout';
import Address from './components/profile/Address';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/product/:id', element: <Product /> }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Auth /> },
      { path: 'register', element: <Register /> },
      { path: 'reset-password', element: <ResetPassword /> }
    ]
  },
  {
    path: '/profile',
    element: <SidebarLayout />,
    children: [{ index: true, element: <Profile /> }]
  },
  {
    path: '/address',
    element: <SidebarLayout />,
    children: [{ index: true, element: <Address /> }]
  }
]);
