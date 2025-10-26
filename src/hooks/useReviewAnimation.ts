import { useState, useEffect } from 'react';

export const useReviewAnimation = (targetPercentage: number) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1000; // 1초

    const animate = () => {
      const timeElapsed = Date.now() - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // ease-out-4 cubic easing
      const smoothEasing = 1 - Math.pow(1 - progress, 4);
      const currentPercentage = targetPercentage * smoothEasing;

      setAnimatedPercentage(currentPercentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [targetPercentage]);

  return animatedPercentage;
};
