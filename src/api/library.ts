import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAxios } from '../context/Axios';

export const useUserReviews = () => {
  const { AuthAPI } = useAxios();

  return useQuery(['Library', 'Reviews'], async () => {
    const response = await AuthAPI.get('/users/reviews');
    return response.data.data;
  });
};

export const useSearch = () => {
  const { PublicAPI } = useAxios();
  const queryClient = useQueryClient();
  const [latestQuery, setLatestQuery] = useState<string>('');

  return async (query: string): Promise<Models.OpenLibrary.Doc[] | null> => {
    if (latestQuery && query === latestQuery) {
      return (
        queryClient.getQueryData<Models.OpenLibrary.Doc[]>(['Search', query]) ||
        null
      );
    }

    if (!query) {
      return null;
    }

    setLatestQuery(query);

    const url = `https://openlibrary.org/search.json?q=${query}`;
    const response = await PublicAPI.get(url);
    const validDocs = (
      response.data.docs as Models.OpenLibrary.DocResponse[]
    ).filter(doc => doc.publisher && doc.author_name && doc.subject);

    return validDocs as Models.OpenLibrary.Doc[];
  };
};
