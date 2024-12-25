import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedLogin({ children }) {
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" />; 
  }
  return children;
}