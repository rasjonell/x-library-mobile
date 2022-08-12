import { useAuth } from '../context/Auth';
import { useAxios } from '../context/Axios';

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

      if (response.data.token) {
        auth.setAuthState({
          authenticated: true,
          accessToken: response.data.token,
          refreshToken: response.data.refresh,
        });
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

      if (response.data.success) {
        auth.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false,
        });
      }
    } catch (error) {
      console.warn('[SIGN OUT] error', error);
    }
  };
};
