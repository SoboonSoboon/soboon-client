import { cn } from '../../../utils/cn';

interface ChipProps {
  children: React.ReactNode;
  size?: 'sm' | 'lg';
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}
export const Chip = ({
  children,
  size = 'lg',
  isActive = false,
  onClick,
  className,
}: ChipProps) => {
  return (
    <div
      role="button"
      onClick={() => {
        if (!isActive) onClick?.();
      }}
      className={cn(
        'inline-flex h-9 min-w-12 items-center justify-center rounded-full font-medium transition-colors select-none',
        size === 'lg' ? 'px-4 text-sm' : 'px-3 text-xs',
        isActive
          ? 'pointer-events-none bg-gray-900 text-white'
          : 'cursor-pointer bg-gray-50 text-black',
        className,
      )}
    >
      {children}
    </div>
  );
};
