import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AuthLayout from './components/layouts/AuthLayout';
import Register from './components/features/auth/components/Register';
import ResetPassword from './components/features/auth/components/ResetPassword';
import Product from './pages/Product';
import SidebarLayout from './components/layouts/SidebarLayout';
import Addresses from './pages/Addresses';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
import ProductTable from './pages/admin/product-management/ProductTable';
import UserTable from './pages/admin/user-management/UserTable';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/product/:id', element: <Product /> },
      { path: '/cart', element: <Cart /> },
      { path: '/wishlist', element: <Wishlist /> }
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
    path: '/account',
    element: <SidebarLayout />,
    children: [{ index: true, element: <Profile /> }]
  },
  {
    path: '/addresses',
    element: <SidebarLayout />,
    children: [{ index: true, element: <Addresses /> }]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'users', element: <UserTable /> },
      { path: 'products', element: <ProductTable /> }
    ]
  }
]);
