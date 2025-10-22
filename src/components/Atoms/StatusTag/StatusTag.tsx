import { cn } from '@/utils/cn';

export interface StatusTagProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
}

const STATUS_LABEL: Record<StatusTagProps['status'], string> = {
  RECRUITING: '모집중',
  COMPLETED: '모집완료',
  CLOSED: '모집종료',
};

const STATUS_STYLE: Record<StatusTagProps['status'], string> = {
  RECRUITING:
    'bg-[var(--GreenScale-Green1)] border-[var(--Keycolor-primary)] text-[var(--Keycolor-primary)]',
  COMPLETED:
    'bg-[var(--GrayScale-Gray5)] border-[var(--text-inactive)] text-[var(--text-sub2)]',
  CLOSED:
    'bg-[var(--GrayScale-Gray5)] border-[var(--text-inactive)] text-[var(--text-sub2)]',
};

export const StatusTag = ({ status, className, ...props }: StatusTagProps) => {
  return (
    <div
      role="status"
      aria-label={`${STATUS_LABEL[status]} 상태`}
      className={cn(
        'mx-auto flex items-center justify-center rounded-3xl border px-3 py-1.5 text-sm font-medium',
        STATUS_STYLE[status],
        className,
      )}
      {...props}
    >
      {STATUS_LABEL[status]}
    </div>
  );
};
