import Login from '@/components/features/auth/components/Login';
import Register from '@/components/features/auth/components/Register';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/auth';
  return <>{isLogin ? <Login /> : <Register />}</>;
};

export default Auth;
