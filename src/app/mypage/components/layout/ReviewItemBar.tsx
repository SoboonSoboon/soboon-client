'use client';
import { Label } from '@/components/Atoms';
import { useEffect, useState } from 'react';

interface ReviewItemBarProps {
  maxCount: number;
  count: number;
  label?: string;
}

export const ReviewItemBar = ({
  maxCount,
  count,
  label,
}: ReviewItemBarProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const targetPercentage = (count / maxCount) * 100;

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1000; // 2초

    const animate = () => {
      const timeElapsed = Date.now() - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const smoothEasing = 1 - Math.pow(1 - progress, 4);
      const currentPercentage = targetPercentage * smoothEasing;

      setAnimatedPercentage(currentPercentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [targetPercentage]);
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex gap-1">
        {label && (
          <Label className="text-[var(--color-gray-95)]">{label}</Label>
        )}
        <span className="text-[var(--color-gray-95)]">{count}</span>
      </div>

      <div className="relative w-full">
        <div className="bg-gray-10 h-4.5 w-full rounded-lg"></div>
        <div
          className="bg-primary absolute top-0 left-0 h-4.5 rounded-lg transition-all duration-300"
          style={{ width: `${animatedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
