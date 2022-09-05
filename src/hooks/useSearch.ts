import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useSearch as useSearchQuery } from '../api/library';
import useDebounce from './useDebounce';

type UseSearchReturn = [
  string,
  () => void,
  () => void,
  (newQuery: string) => void,
  {
    isError: boolean;
    isLoading: boolean;
    data: Models.OpenLibrary.Doc[] | null | undefined;
  },
];

const useSearch = (): UseSearchReturn => {
  const searchBooks = useSearchQuery();
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 600);
  const { data, isLoading, isError, refetch } = useQuery(
    ['Search', debouncedQuery],
    () => searchBooks(debouncedQuery),
  );

  const onSubmit = () => {
    refetch();
  };

  const clearQuery = () => {
    setQuery('');
  };

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return [
    query,
    onSubmit,
    clearQuery,
    onQueryChange,
    { data, isLoading, isError },
  ];
};

export default useSearch;
