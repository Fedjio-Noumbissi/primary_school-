import { useSearchParams } from 'react-router-dom';

/**
 * Hook to manage list filters directly in the URL.
 */
export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    search: searchParams.get('search') ?? '',
    page: Number(searchParams.get('page')) || 1,
    statut: searchParams.get('statut') ?? '',
    sort: searchParams.get('sort') ?? '',
  };

  const setFilter = (key: string, value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      
      // Reset to page 1 when any filter other than page changes
      if (key !== 'page') {
        newParams.set('page', '1');
      }
      
      return newParams;
    });
  };

  return { filters, setFilter };
};
