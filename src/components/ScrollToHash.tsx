import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return null;
};

export default ScrollToHash;

