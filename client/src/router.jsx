import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AuthLayout from './layouts/AuthLayout';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';

export const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [{ index: true, element: <Home /> }] },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Auth /> },
      { path: 'register', element: <Register /> },
      { path: 'reset-password', element: <ResetPassword /> }
    ]
  }
]);
