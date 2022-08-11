import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import AuthProvider from './context/Auth';
import AxiosProvider from './context/Axios';

import App from './App';

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AxiosProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </AxiosProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default Root;
