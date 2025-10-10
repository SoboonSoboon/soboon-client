import * as React from 'react';
export interface BadgeProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> {
  count?: number;
  showZero?: boolean;
  max?: number;
}
function formatCount(value: number, max: number): string {
  return value > max ? `${max}+` : String(value);
}
export const Badge = ({ count, showZero = false, max = 999, className, ...rest }: BadgeProps) => {
  if (count === undefined || !Number.isFinite(count)) return null;
  if (!showZero && count === 0) return null;
  const text = formatCount(count, max);

  const base =
    'inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-zinc-800 text-zinc-100 text-xs leading-none font-medium'; // 디자인 수정예정
  return (
    <span role="status" aria-label={`알림 ${text}`} className={className ? `${base} ${className}` : base} {...rest}>
      {text}
    </span>
  );
};
