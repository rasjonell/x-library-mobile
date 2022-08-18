import { SERVER_URL as BASE_URL } from '@env';
import * as Keychain from 'react-native-keychain';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { defaultAuthState, useAuth } from '../Auth';
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
  UnprocessableEntityError,
} from '../../utils/errors';
import { userFromResponse } from '../../api/auth';

export const useAuthorizedRequestInterceptors = () => {
  const auth = useAuth();

  return [
    (config: AxiosRequestConfig) => {
      const accessToken = auth.authState.accessToken;

      if (config.headers && !config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: any) => Promise.reject(error),
  ];
};

export const useFailedRequestInterceptors = () => {
  const auth = useAuth();

  return [
    (response: AxiosResponse) => response,
    (error: any) => {
      const response = error.response as AxiosErrorResponse['response'];
      const errorMessage = response.data.errors.detail;
      const changesetErrors = response.data.errors.error;

      switch (response.status) {
        case 401:
          auth.setAuthState(defaultAuthState);
          throw new UnauthorizedError(errorMessage, changesetErrors);

        case 404:
          throw new NotFoundError(errorMessage);

        case 400:
          throw new BadRequestError(errorMessage);

        case 422:
          throw new UnprocessableEntityError(errorMessage, changesetErrors);

        default:
          throw new InternalServerError();
      }
    },
  ];
};

export const useRefreshAuthInterceptor = () => {
  const auth = useAuth();
  const data = {
    refresh: auth.authState.refreshToken,
  };

  const options = {
    data,
    method: 'POST',
    url: `${BASE_URL}/users/refresh`,
  };

  return async () => {
    try {
      const response = await axios(options);
      if (!response.config.headers) {
        response.config.headers = {};
      }

      const user = userFromResponse(response);
      const accessToken = response.data.token;
      const refreshToken = response.data.refresh;
      response.config.headers.Authorization = `Bearer ${accessToken}`;

      auth.setAuthState({
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
      auth.setAuthState(defaultAuthState);
    }
  };
};
