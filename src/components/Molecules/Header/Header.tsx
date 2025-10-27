'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Button,
  Logo,
  ProfileImg,
  UserMenuModal,
  Icon,
  type IconType,
} from '@/components/Atoms';
import { redirectToKakao } from '@/apis/auth/authApi';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useState } from 'react';
import { HEADER_MENU } from '@/constants';

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
    <header className="border-gray-10 h-15 border-b bg-white px-4 dark:bg-black">
      <div className="text-text-main mx-auto flex h-full max-w-[1200px] items-center justify-between bg-white dark:bg-black dark:text-white">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="flex items-center gap-6 text-base font-normal">
            {isLoggedIn && (
              <>
                {Object.entries(HEADER_MENU).map(([key, headerMenu]) => (
                  <Link
                    key={key}
                    href={headerMenu.PATH}
                    className={`group hover:text-primary flex items-center gap-1 whitespace-nowrap ${
                      pathname.startsWith(headerMenu.PATH) ? 'text-primary' : ''
                    }`}
                  >
                    <div className="relative">
                      <Icon
                        type={
                          pathname.startsWith(headerMenu.PATH)
                            ? (headerMenu.ICON.GREEN as IconType)
                            : (headerMenu.ICON.DEFAULT as IconType)
                        }
                        size={headerMenu.SIZE}
                        className="transition-opacity duration-150 ease-in-out group-hover:opacity-0"
                      />
                      <Icon
                        type={headerMenu.ICON.GREEN as IconType}
                        size={headerMenu.SIZE}
                        className="absolute top-0 left-0 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100"
                      />
                    </div>
                    <span className="font-memomentKkukkkuk">
                      {headerMenu.LABEL}
                    </span>
                  </Link>
                ))}
              </>
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
