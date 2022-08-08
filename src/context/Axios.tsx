import React, { createContext, PropsWithChildren, useContext } from 'react';

import axios, { AxiosInstance } from 'axios';
import * as Keychain from 'react-native-keychain';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { AuthContext } from './Auth';

const BASE_URL = 'http://localhost:4000/api';

interface IAxiosContext {
  AuthAPI: AxiosInstance;
  PublicAPI: AxiosInstance;
}

export const AxiosContext = createContext<IAxiosContext>({
  AuthAPI: axios,
  PublicAPI: axios,
});

const AxiosProvider = ({ children }: PropsWithChildren) => {
  const authContext = useContext(AuthContext);

  const AuthAPI = axios.create({
    baseURL: BASE_URL,
  });

  const PublicAPI = axios.create({
    baseURL: BASE_URL,
  });

  AuthAPI.interceptors.request.use(
    config => {
      const accessToken = authContext.authState.accessToken;

      if (config.headers && !config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    console.log(failedRequest);

    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      data,
      method: 'POST',
      url: `${BASE_URL}/users/refresh`,
    };

    try {
      const response = await axios(options);
      if (!response.config.headers) {
        response.config.headers = {};
      }

      const accessToken = response.data.accessToken;
      response.config.headers.Authorization = `Bearer ${accessToken}`;

      authContext.setAuthState({
        ...authContext.authState,
        accessToken,
      });

      return await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken: authContext.authState.refreshToken,
        }),
      );
    } catch (error) {
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  };

  createAuthRefreshInterceptor(AuthAPI, refreshAuthLogic);

  return (
    <AxiosContext.Provider value={{ AuthAPI, PublicAPI }}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);

export default AxiosProvider;
