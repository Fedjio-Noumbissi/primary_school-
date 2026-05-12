import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ children, allowedRoles, redirectTo = '/unauthorized' }: ProtectedRouteProps) => {
  const { isAuthenticated, user, hasRole } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!hasRole(allowedRoles)) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};
