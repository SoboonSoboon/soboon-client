'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/useClickOutside';

export interface UserMenuModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClick?: () => void;
  onClose?: () => void;
}

export const UserMenuModal = ({
  className,
  onClose,
  onClick,
  ...props
}: UserMenuModalProps) => {
  const menuRef = useClickOutside(onClose as () => void);

  return (
    <div
      ref={menuRef}
      className={cn(
        'border-gray-10 mt-2.5 flex w-35 flex-col rounded-xl border-1 bg-white',
        className,
      )}
      {...props}
    >
      <ul className="text-gray-90 flex flex-col">
        <li className="hover:bg-orange-5 flex cursor-pointer border-b border-[var(--GrayScale-Gray10)] px-4 py-2.5 font-medium text-[#1F2937] transition-all duration-200 hover:rounded-t-xl">
          <Link href="/mypage">
            <span>마이페이지</span>
          </Link>
        </li>
        <li
          onClick={onClick}
          className="hover:bg-orange-5 flex cursor-pointer px-4 py-2.5 font-medium transition-all duration-200 hover:rounded-b-xl"
        >
          <span>로그아웃</span>
        </li>
      </ul>
    </div>
  );
};
