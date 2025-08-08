import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // If not authenticated, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // If roles are specified, check if user role is allowed
  const allowedRoles = Array.isArray(role) ? role : [role];

  if (!allowedRoles.includes(user.role)) {
    // Role not allowed → redirect based on role
    if (user.role === 'user') {
      return <Navigate to="/home" />;
    } else if (user.role === 'recruiter') {
      return <Navigate to="/postjob" />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  }

  // Role is allowed → render the protected component
  return children;
};

export default ProtectedRoute;
