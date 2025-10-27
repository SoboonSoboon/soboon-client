import { cn } from '@/utils/cn';

export interface StatusTagProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED' | 'ReviewClosed' | 'ReviewOpen';
}

const STATUS_LABEL: Record<StatusTagProps['status'], string> = {
  RECRUITING: '모집중',
  COMPLETED: '모집완료',
  CLOSED: '모집종료',
  ReviewClosed: '리뷰 완료',
  ReviewOpen: '리뷰 대기',
};

const STATUS_STYLE: Record<StatusTagProps['status'], string> = {
  RECRUITING: 'bg-Green-1 border-primary text-primary',
  COMPLETED: 'bg-[var(--GrayScale-Gray5)] border-text-inactive text-text-sub2',
  CLOSED: 'bg-[var(--GrayScale-Gray5)] border-text-inactive text-text-sub2',
  ReviewOpen: 'bg-[var(--GreenScale-Green1)] border-primary text-primary',
  ReviewClosed:
    'bg-[var(--GrayScale-Gray5)] border-[var(--text-inactive)] text-text-sub2',
};

export const StatusTag = ({ status, className, ...props }: StatusTagProps) => {
  return (
    <span
      role="status"
      aria-label={`${STATUS_LABEL[status]} 상태`}
      className={cn(
        'w-fit rounded-3xl border px-3 py-1.5 text-sm font-medium',
        STATUS_STYLE[status],
        className,
      )}
      {...props}
    >
      {STATUS_LABEL[status]}
    </span>
  );
};
