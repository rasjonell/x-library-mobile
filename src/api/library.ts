import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../context/Axios';

export const useUserReviews = () => {
  const { AuthAPI } = useAxios();

  return useQuery(['Library', 'Reviews'], async () => {
    const response = await AuthAPI.get('/users/reviews');
    return response.data.data;
  });
};
