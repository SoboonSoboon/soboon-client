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
    <div className="flex w-full flex-col gap-1 sm:gap-1.5">
      <div className="flex gap-1 sm:gap-2">
        {label && (
          <Label className="text-sm text-[var(--color-gray-95)] sm:text-base">
            {label}
          </Label>
        )}
        <span className="text-primary text-sm font-medium sm:text-base">
          {count}
        </span>
      </div>

      <div className="relative w-full">
        <div className="bg-gray-10 h-3.5 w-full rounded-lg sm:h-4.5"></div>
        <div
          className="bg-primary absolute top-0 left-0 h-3.5 rounded-lg transition-all duration-300 sm:h-4.5"
          style={{ width: `${finalPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
