import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to update the document title and scroll to top on page change.
 * @param title The title of the page to display in the browser tab.
 */
export const usePageMeta = (title: string) => {
  const location = useLocation();

  useEffect(() => {
    // Tab title
    document.title = `EduPrime — ${title}`;
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, title]);
};
