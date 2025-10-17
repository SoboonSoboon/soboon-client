import { cn } from '@/utils/cn';
import Link from 'next/link';

export interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const UserMenu = ({ className, ...props }: UserMenuProps) => {
  return (
    <div
      className={cn(
        'border-gray-10 flex w-35 flex-col rounded-xl border-1 bg-white',
        className,
      )}
      {...props}
    >
      <ul className="text-gray-90 flex flex-col">
        <li className="flex border-b border-[var(--GrayScale-Gray10)] px-4 py-2.5 text-[#1F2937]">
          <Link href="/mypage">
            <span>마이페이지</span>
          </Link>
        </li>
        <li className="flex cursor-pointer px-4 py-2.5">
          <span>로그아웃</span>
        </li>
      </ul>
    </div>
  );
};
