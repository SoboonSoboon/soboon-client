import { Label } from '@/components/Atoms';

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
  const percentage = Math.min((count / maxCount) * 100, 100);

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
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
