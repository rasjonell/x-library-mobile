import { useQuery } from '@tanstack/react-query';

import { useBook as useBookQuery } from '../library';

const THIRTY_SECONDS = 30 * 1000;

const useBook = (id: string) => {
  const getBook = useBookQuery();
  return useQuery(['Library', id], () => getBook(id), {
    staleTime: THIRTY_SECONDS,
  });
};

export default useBook;
