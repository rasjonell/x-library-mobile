import { AxiosResponse } from 'axios';
import * as Keychain from 'react-native-keychain';

import { useAxios } from '../context/Axios';
import { IUser, useAuth } from '../context/Auth';

export function userFromResponse(response: AxiosResponse): IUser {
  const { id, name, email, reviews, books_read: booksRead } = response.data;

  return {
    id,
    name,
    email,
    reviews,
    booksRead,
  };
}

export const useSignIn = () => {
  const { PublicAPI } = useAxios();
  const auth = useAuth();

  return async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await PublicAPI.post('/users/signin', {
        user: {
          email,
          password,
        },
      });

      if (response.data?.token) {
        const { refresh, token } = response.data;
        const user = userFromResponse(response);

        const authState = {
          user,
          accessToken: token,
          authenticated: true,
          refreshToken: refresh,
        };

        auth.setAuthState(authState);

        await Keychain.setGenericPassword('token', JSON.stringify(authState));
      }
    } catch (error) {
      console.warn('[SIGN IN] error', error);
    }
  };
};

export const useSignOut = () => {
  const { AuthAPI } = useAxios();
  const auth = useAuth();

  return async () => {
    try {
      const response = await AuthAPI.post('/users/signout');

      if (response.data?.success) {
        auth.logout();
      }
    } catch (error) {
      console.warn('[SIGN OUT] error', error);
    }
  };
};

export function useGetProfile() {
  const { AuthAPI } = useAxios();

  return async () => {
    try {
      const response = await AuthAPI.get('/users/me');
      return userFromResponse(response);
    } catch (error) {
      console.warn('[GET PROFILE] error', error);
      return null;
    }
  };
}
