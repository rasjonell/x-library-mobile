import React, { createContext, PropsWithChildren, useContext } from 'react';

import axios, { AxiosInstance } from 'axios';
import { SERVER_URL as BASE_URL } from '@env';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import {
  useRefreshAuthInterceptor,
  useFailedRequestInterceptors,
  useAuthorizedRequestInterceptors,
} from './helpers/interceptors';

interface IAxiosContext {
  AuthAPI: AxiosInstance;
  PublicAPI: AxiosInstance;
}

export const AxiosContext = createContext<IAxiosContext>({
  AuthAPI: axios,
  PublicAPI: axios,
});

const AxiosProvider = ({ children }: PropsWithChildren) => {
  const refreshAuthInterceptor = useRefreshAuthInterceptor();
  const failedRequestInterceptor = useFailedRequestInterceptors();
  const authorizedRequestInterceptor = useAuthorizedRequestInterceptors();

  const AuthAPI = axios.create({
    baseURL: BASE_URL,
  });

  const PublicAPI = axios.create({
    baseURL: BASE_URL,
  });

  createAuthRefreshInterceptor(AuthAPI, refreshAuthInterceptor);
  AuthAPI.interceptors.response.use(...failedRequestInterceptor);
  PublicAPI.interceptors.response.use(...failedRequestInterceptor);
  AuthAPI.interceptors.request.use(...authorizedRequestInterceptor);

  return (
    <AxiosContext.Provider value={{ AuthAPI, PublicAPI }}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);

export default AxiosProvider;
