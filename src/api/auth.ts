import { AxiosResponse } from 'axios';
import * as Keychain from 'react-native-keychain';

import useToast from '../hooks/useToast';
import { XLibError } from '../utils/errors';
import { useAxios } from '../context/Axios';
import { IAuthContext, useAuth } from '../context/Auth';

export function userFromResponse(response: AxiosResponse): Models.User {
  const {
    id,
    bio,
    name,
    email,
    reviews,
    books_read: booksRead,
    average_rating: averageRating,
  } = response.data;

  return {
    id,
    bio,
    name,
    email,
    reviews,
    booksRead,
    averageRating,
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
  const auth = useAuth();
  const toast = useToast('auth');
  const { PublicAPI } = useAxios();

  return async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<XLibError | null> => {
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
        description:
          'Unable To Sign You In. Please Correct Errors and Try Again',
      });

      return error as XLibError;
    }

    return null;
  };
};

export const useSignUp = () => {
  const auth = useAuth();
  const toast = useToast('auth');
  const { PublicAPI } = useAxios();

  return async (user: {
    name: string;
    email: string;
    password: string;
  }): Promise<XLibError | null> => {
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
      const normalizedError = error as XLibError;

      if (normalizedError.changesetErrors) {
        return normalizedError;
      }

      toast({
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        title: 'Unexpected Error',
        description: 'Unable To Sign You Up. Please Try Again',
      });
    }

    return null;
  };
};

export const useSignOut = () => {
  const auth = useAuth();
  const toast = useToast('auth');
  const { AuthAPI } = useAxios();

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
      return null;
    }
  };
}
