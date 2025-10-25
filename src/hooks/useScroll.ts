import { useEffect, useState } from 'react';

export const useInfiniteScrollTrigger = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const threshold = 600;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      setIsBottom(distanceFromBottom < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isBottom };
};
