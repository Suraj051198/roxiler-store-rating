import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, requiredRole, children }) => {
  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  // If requiredRole is specified, check if user has the required role
  if (requiredRole) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (currentUser.role !== requiredRole) {
      // Redirect to dashboard if user doesn't have required role
      return <Navigate to="/dashboard" />;
    }
  }
  
  // Render children if all checks pass
  return children;
};

export default ProtectedRoute; 