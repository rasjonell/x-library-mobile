import React, { createContext, PropsWithChildren, useContext } from 'react';

import axios, { AxiosInstance, AxiosResponse } from 'axios';
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

  const unauthorizedInterceptors = [
    (response: AxiosResponse) => {
      return response;
    },
    (error: any) => {
      if (error.response.status === 401) {
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false,
        });
      }
      return error;
    },
  ];

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

  AuthAPI.interceptors.response.use(...unauthorizedInterceptors);
  PublicAPI.interceptors.response.use(...unauthorizedInterceptors);

  const refreshAuthLogic = async (failedRequest: any) => {
    console.log('FAILED REQUEST', failedRequest);

    const data = {
      refresh: authContext.authState.refreshToken,
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

      const accessToken = response.data.token;
      const refreshToken = response.data.refresh;
      response.config.headers.Authorization = `Bearer ${accessToken}`;

      authContext.setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });

      return await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken,
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
