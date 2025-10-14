import { cn } from '@/utils/cn';

interface KeyWordBarProps {
  max?: number;
  count: number;
  label?: string;
}

export const KeyWordBar = ({ max = 10, count, label }: KeyWordBarProps) => {
  const percentage = Math.min((count / max) * 100, 100);

  const getBarColor = () => {
    if (count < 4) {
      return 'bg-orange-30';
    } else if (count < 8) {
      return 'bg-orange-40';
    } else {
      return 'bg-orange-50';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 text-start">
          <span className="text-sm font-medium text-gray-900">{label}</span>
        </div>
      )}
      <div className="relative h-[41px] w-full">
        <div className="h-full w-full rounded-lg bg-gray-100"></div>

        <div
          className={cn(
            'absolute top-0 left-0 h-full rounded-lg transition-all duration-300',
            getBarColor(),
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
