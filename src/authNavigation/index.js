import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
export default function AuthProviders() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
