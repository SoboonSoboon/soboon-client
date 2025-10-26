'use client';

import { Label } from '@/components/Atoms';
import { useReviewAnimation } from '@/hooks/useReviewAnimation';

interface ReviewItemBarProps {
  maxCount: number;
  count: number;
  label?: string;
  animated?: boolean;
}

export const ReviewItemBar = ({
  maxCount,
  count,
  label,
  animated = true,
}: ReviewItemBarProps) => {
  const targetPercentage = 6 + (count / maxCount) * 100;
  const animatedPercentage = useReviewAnimation(targetPercentage);

  // animated가 false면 애니메이션 없이 바로 최종값 표시
  const finalPercentage = animated ? animatedPercentage : targetPercentage;

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex gap-1">
        {label && (
          <Label className="text-[var(--color-gray-95)]">{label}</Label>
        )}
        <span className="text-primary">{count}</span>
      </div>

      <div className="relative w-full">
        <div className="bg-gray-10 h-4.5 w-full rounded-lg"></div>
        <div
          className="bg-primary absolute top-0 left-0 h-4.5 rounded-lg transition-all duration-300"
          style={{ width: `${finalPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
