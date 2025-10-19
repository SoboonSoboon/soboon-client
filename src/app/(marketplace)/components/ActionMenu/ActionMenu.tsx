'use client';

import { cn } from '@/utils/cn';
import { useClickOutside } from '@/hooks/useClickOutside';

export interface ActionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
}

export const ActionMenu = ({
  className,
  onClose,
  buttonRef,
  ...props
}: ActionMenuProps) => {
  const menuRef = useClickOutside(onClose as () => void, buttonRef);

  return (
    <div
      ref={menuRef}
      className={cn(
        'border-gray-10 mt-2.5 flex w-35 flex-col rounded-xl border-1 bg-white shadow-[0_0_6px_rgba(0,0,0,0.15)]',
        className,
      )}
      {...props}
    >
      <ul className="text-gray-90 flex flex-col">
        <li className="text-text-main flex cursor-pointer items-center justify-center border-b border-[var(--GrayScale-Gray10)] px-4 py-2.5 transition-all duration-200 hover:rounded-t-xl">
          <span>수정</span>
        </li>
        <li className="text-warning flex cursor-pointer items-center justify-center px-4 py-2.5 transition-all duration-200 hover:rounded-b-xl">
          <span>삭제</span>
        </li>
      </ul>
    </div>
  );
};
