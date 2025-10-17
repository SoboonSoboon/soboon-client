import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
}

export const UserMenu = ({ className, onClose, ...props }: UserMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (onClose) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className={cn(
        'border-gray-10 flex w-35 flex-col rounded-xl border-1 bg-white',
        className,
      )}
      {...props}
    >
      <ul className="text-gray-90 flex flex-col">
        <li className="hover:bg-orange-5 flex cursor-pointer border-b border-[var(--GrayScale-Gray10)] px-4 py-2.5 text-[#1F2937] transition-all duration-200 hover:rounded-t-xl">
          <Link href="/mypage">
            <span>마이페이지</span>
          </Link>
        </li>
        <li className="hover:bg-orange-5 flex cursor-pointer px-4 py-2.5 transition-all duration-200 hover:rounded-b-xl">
          <span>로그아웃</span>
        </li>
      </ul>
    </div>
  );
};
