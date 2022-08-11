import React from 'react';
import { NativeBaseProvider } from 'native-base';
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
        <NativeBaseProvider>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </NativeBaseProvider>
      </AxiosProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default Root;
