import { useAuth } from '../context/Auth';
import { useAxios } from '../context/Axios';

export const useSignIn = () => {
  const { PublicAPI } = useAxios();
  const auth = useAuth();

  return async ({ email, password }: { email: string; password: string }) => {
    try {
      const data = await PublicAPI.post('/users/signin', {
        user: {
          email,
          password,
        },
      });

      if (data?.data.token) {
        auth.setAuthState({
          accessToken: data.data.token,
          refreshToken: data.data.token,
          authenticated: true,
        });
      }
    } catch (error) {
      console.log('FUCKY WUCKY', error);
    }
  };
};
