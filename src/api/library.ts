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

export const useBook = () => {
  const { AuthAPI } = useAxios();

  return async (id: string): Promise<Required<Models.Book> | null> => {
    try {
      const result = await AuthAPI.get(`/books/${id}`);
      return result.data.data;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };
};

export const useReview = () => {
  const { AuthAPI } = useAxios();

  return async (id: string): Promise<Required<Models.Review> | null> => {
    try {
      const result = await AuthAPI.get(`/reviews/${id}`);
      return result.data;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };
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
