// Export all contexts and providers
import React from 'react';
import { ApiProvider, useApi } from './AppContext';
import { AuthProvider, useAuth } from './AuthContext';

export { ApiProvider, useApi, AuthProvider, useAuth };

// Combined provider for convenience
export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ApiProvider>
        {children}
      </ApiProvider>
    </AuthProvider>
  );
};
