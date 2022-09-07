import { useQuery } from '@tanstack/react-query';

import { useReview as useReviewQuery } from '../library';

const ONE_MINUTE = 60 * 1000;

const useReview = (id: string) => {
  const getReview = useReviewQuery();

  return useQuery(['Review', id], () => getReview(id), {
    staleTime: ONE_MINUTE,
  });
};

export default useReview;
