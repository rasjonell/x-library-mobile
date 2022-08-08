import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './context/Auth';
import AxiosProvider from './context/Axios';

import App from './App';

const Root = () => (
  <AuthProvider>
    <AxiosProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </AxiosProvider>
  </AuthProvider>
);

export default Root;
