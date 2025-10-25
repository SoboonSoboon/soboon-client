'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Logo, ProfileImg, UserMenuModal } from '../../Atoms';
import { redirectToKakao } from '@/apis/auth/authApi';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useState } from 'react';

export const Header = () => {
  const pathname = usePathname() || '/';
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userName = useAuthStore((state) => state.userName);
  const userNickname = useAuthStore((state) => state.userNickname);
  const userImage = useAuthStore((state) => state.userImage);
  const [isOpen, setIsOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    console.log('로그아웃 되었습니다.');
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };

  // const onCreateGather = () => {
  //   window.location.href = '/gather/create';
  // };

  return (
    <header className="border-gray-10 h-15 border-b bg-white dark:bg-black">
      <div className="text-text-main mx-auto flex h-full max-w-[1200px] items-center justify-between bg-white dark:bg-black dark:text-white">
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <Link href="/">
              <Logo width={75} height={28} />{' '}
            </Link>
          ) : (
            <>
              <Logo width={75} height={28} />
            </>
          )}

          <nav className="flex items-center gap-6 text-base font-normal">
            {isLoggedIn ? (
              <>
                <Link
                  href="/sharing"
                  className={`font-memomentKkukkkuk hover:text-primary whitespace-nowrap ${
                    pathname.startsWith('/sharing') ? 'text-primary' : ''
                  }`}
                >
                  함께 소분하기
                </Link>
                <Link
                  href="/shopping"
                  className={`font-memomentKkukkkuk hover:text-primary whitespace-nowrap ${
                    pathname.startsWith('/shopping') ? 'text-primary' : ''
                  }`}
                >
                  함께 장보기
                </Link>
              </>
            ) : (
              <></>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <span
                  className="flex items-center gap-[10px]"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <ProfileImg
                      profileImageUrl={userImage || undefined}
                      size={40}
                    />
                  </div>
                  <span className="hidden text-base font-semibold md:block dark:text-white">
                    {userNickname || userName}
                  </span>
                </span>
                {isOpen && (
                  <div className="absolute top-full right-0 z-50 mt-2">
                    <UserMenuModal
                      onClick={handleLogout}
                      onClose={() => setIsOpen(false)}
                    />
                  </div>
                )}
              </div>
              {/* <Button
                primary
                size="small"
                onClick={onCreateGather}
                label="모임 만들기"
              />
              <Button size="small" onClick={handleLogout} label="로그아웃" /> */}
            </>
          ) : (
            <>
              <Button onClick={redirectToKakao} label="시작하기" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
