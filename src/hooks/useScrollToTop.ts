import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls window to the top whenever the location changes.
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollToTop;
