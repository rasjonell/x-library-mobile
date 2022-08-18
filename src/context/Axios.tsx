import React, { createContext, PropsWithChildren, useContext } from 'react';

import * as Keychain from 'react-native-keychain';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { SERVER_URL as BASE_URL } from '@env';

import { AuthContext, defaultAuthState } from './Auth';
import { userFromResponse } from '../api/auth';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError,
} from '../utils/errors';

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
      const response = error.response as AxiosErrorResponse['response'];
      const errorMessage = response.data.errors.detail;
      const changesetErrors = response.data.errors.error;

      switch (response.status) {
        case 401:
          authContext.setAuthState(defaultAuthState);
          throw new UnauthorizedError(errorMessage);

        case 404:
          throw new NotFoundError(errorMessage);

        case 400:
          throw new BadRequestError(errorMessage);

        case 422:
          throw new UnprocessableEntityError(errorMessage, changesetErrors);

        default:
          break;
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

  const refreshAuthLogic = async () => {
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
      const user = userFromResponse(response);

      authContext.setAuthState({
        user,
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
      authContext.setAuthState(defaultAuthState);
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
