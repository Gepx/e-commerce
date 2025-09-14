import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/common/loading/Loading';

import RootLayout from './components/layouts/RootLayout';
import AuthLayout from './components/layouts/AuthLayout';
import SidebarLayout from './components/layouts/SidebarLayout';

import Auth from './pages/Auth';
import Register from './components/features/auth/components/Register';
import ResetPassword from './components/features/auth/components/ResetPassword';

const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Forbidden = lazy(() => import('./pages/Forbidden'));
const Profile = lazy(() => import('./pages/Profile'));
const Addresses = lazy(() => import('./pages/Addresses'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const ProductTable = lazy(() => import('./pages/admin/product-management/ProductTable'));
const UserTable = lazy(() => import('./pages/admin/user-management/UserTable'));

const lazyWrapper = (LazyComponent) => (
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
);

export const router = createBrowserRouter([
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
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: lazyWrapper(Home) },
      { path: '/product/:id', element: lazyWrapper(Product) },
      { path: '/cart', element: lazyWrapper(Cart) },
      { path: '/wishlist', element: lazyWrapper(Wishlist) },
      { path: '*', element: lazyWrapper(PageNotFound) },
      { path: '/forbidden', element: lazyWrapper(Forbidden) }
    ]
  },
  {
    path: '/account',
    element: <SidebarLayout />,
    children: [{ index: true, element: lazyWrapper(Profile) }]
  },
  {
    path: '/addresses',
    element: <SidebarLayout />,
    children: [{ index: true, element: lazyWrapper(Addresses) }]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: lazyWrapper(Dashboard) },
      { path: 'users', element: lazyWrapper(UserTable) },
      { path: 'products', element: lazyWrapper(ProductTable) }
    ]
  }
]);
