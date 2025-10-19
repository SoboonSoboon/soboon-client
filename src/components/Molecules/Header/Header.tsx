'use client';

import Link from 'next/link';
import { Button, Logo, ProfileImg } from '../../Atoms';
import { redirectToKakao } from '@/apis/auth/authApi';

type User = {
  name: string;
  image: string;
};

export interface HeaderProps {
  user?: User;
  // onLogout?: () => void;
  onCreateGather?: () => void;
}

export const Header = ({
  user,
  // onLogout,
  onCreateGather,
}: HeaderProps) => (
  <header className="border-gray-10 h-15 border-b bg-white dark:bg-black">
    <div className="text-text-main mx-auto flex h-full max-w-[1200px] items-center justify-between bg-white dark:bg-black dark:text-white">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Logo width={75} height={28} />
        </Link>
        <nav className="flex items-center gap-6 text-base font-normal">
          <Link
            href="/shopping"
            className="font-memomentKkukkkuk hover:text-primary whitespace-nowrap"
          >
            함께 장보기
          </Link>
          <Link
            href="/sharing"
            className="font-memomentKkukkkuk hover:text-primary whitespace-nowrap"
          >
            함께 소분하기
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        {user ? (
          <>
            <span className="flex items-center gap-[10px]">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <ProfileImg profileImageUrl={user.image} />
              </div>
              <b className="text-text-main hidden text-base font-semibold md:block dark:text-white">
                {user.name}
              </b>
            </span>
            <Button
              primary
              size="small"
              onClick={onCreateGather}
              label="모임 만들기"
            />
            {/* <Button size="small" onClick={onLogout} label="로그아웃" /> */}
          </>
        ) : (
          <>
            <Button
              primary
              size="small"
              onClick={redirectToKakao}
              label="시작하기"
            />
          </>
        )}
      </div>
    </div>
  </header>
);
