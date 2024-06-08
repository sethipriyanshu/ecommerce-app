import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
