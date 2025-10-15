import { cn } from '@/utils/cn';

export interface BadgeProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> {
  count: number;
  showZero?: boolean;
  maxCount?: number;
}

function formatCount(value: number, maxCount: number): string {
  return value > maxCount ? `${maxCount}+` : String(value);
}

export const Badge = ({
  count,
  showZero = false,
  maxCount = 999,
  className,
  ...rest
}: BadgeProps) => {
  if (!Number.isFinite(count)) return null;

  if (count < 0) return null;

  if (!showZero && count === 0) return null;

  const text = formatCount(count, maxCount);

  // @TODO: 디자인 수정예정
  const baseStyle =
    'inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-zinc-800 text-zinc-100 text-xs leading-none font-medium';

  return (
    <span
      role="status"
      aria-label={`알림 ${text}`}
      className={cn(baseStyle, className)}
      {...rest}
    >
      {text}
    </span>
  );
};
