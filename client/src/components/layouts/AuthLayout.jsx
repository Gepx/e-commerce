import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default AuthLayout;
