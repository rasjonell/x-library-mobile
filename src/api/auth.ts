import { AxiosResponse } from 'axios';
import * as Keychain from 'react-native-keychain';

import { useAxios } from '../context/Axios';
import { IAuthContext, useAuth } from '../context/Auth';
import useToast from '../hooks/useToast';

export function userFromResponse(response: AxiosResponse): Models.User {
  const {
    id,
    bio,
    name,
    email,
    reviews,
    books_read: booksRead,
  } = response.data;

  return {
    id,
    bio,
    name,
    email,
    reviews,
    booksRead,
  };
}

async function updateAuthState(auth: IAuthContext, response: AxiosResponse) {
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

export const useSignIn = () => {
  const { PublicAPI } = useAxios();
  const auth = useAuth();
  const toast = useToast();

  return async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await PublicAPI.post('/users/signin', {
        user: {
          email,
          password,
        },
      });

      if (response.data.token) {
        updateAuthState(auth, response);
        toast({
          isClosable: true,
          status: 'success',
          title: 'Signed In!',
          variant: 'top-accent',
          description: 'Enjoy Your Experience with X-Library',
        });
      }
    } catch (error) {
      toast({
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title: 'Unexpected Error',
        description: 'Unable To Sign You In. Please Try Again',
      });
      console.warn('[SIGN IN] error', error);
    }
  };
};

export const useSignUp = () => {
  const { PublicAPI } = useAxios();
  const auth = useAuth();
  const toast = useToast();

  return async (user: { name: string; email: string; password: string }) => {
    try {
      const response = await PublicAPI.post('/users/signup', {
        user,
      });

      if (response.data.token) {
        updateAuthState(auth, response);
        toast({
          isClosable: true,
          status: 'success',
          title: 'Signed Up!',
          variant: 'top-accent',
          description: 'Enjoy Your Experience with X-Library',
        });
      }
    } catch (error) {
      console.warn('[SIGN UP] error', error);
      toast({
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title: 'Unexpected Error',
        description: 'Unable To Sign You Up. Please Try Again',
      });
    }
  };
};

export const useSignOut = () => {
  const { AuthAPI } = useAxios();
  const auth = useAuth();
  const toast = useToast();

  return async () => {
    try {
      const response = await AuthAPI.post('/users/signout');

      if (response.data?.success) {
        auth.logout();
        toast({
          isClosable: true,
          status: 'success',
          title: 'Logged Out',
          variant: 'top-accent',
          description: 'Successfully Signed You Out.',
        });
      }
    } catch (error) {
      console.warn('[SIGN OUT] error', error);
      toast({
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title: 'Unexpected Error',
        description: 'Unable To Sign You Out. Please Try Again',
      });
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
