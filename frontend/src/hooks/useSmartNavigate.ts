import { useNavigate } from 'react-router-dom';

/**
 * Hook for intelligent navigation back with a fallback.
 */
export const useSmartNavigate = () => {
  const navigate = useNavigate();

  const goBack = (fallback: string) => {
    // If we can go back in history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return { goBack };
};
