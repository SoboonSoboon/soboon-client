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
import Image from 'next/image';

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

  return (
    <header className="border-gray-10 fixed top-0 right-0 left-0 z-50 h-15 border-b bg-white pr-20 pl-4">
      <div className="text-text-main mx-auto flex h-full max-w-[1200px] items-center justify-between bg-white">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="flex items-center gap-3 text-base font-normal sm:gap-4 md:gap-5 lg:gap-6">
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
                    <div className="relative hidden sm:flex sm:items-center">
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
                    <span className="font-memomentKkukkkuk leading-none">
                      {headerMenu.LABEL}
                    </span>
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>

        <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {isLoggedIn ? (
            <>
              <div className="cursor-pointer">
                <span
                  className="flex items-center gap-1 sm:gap-2 md:gap-[10px]"
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
                  <span className="hidden text-base font-semibold md:block">
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
            </>
          ) : (
            <>
              <div className="relative">
                <Button onClick={redirectToKakao} label="시작하기" />
                <div className="absolute -bottom-[115%] left-1/2 h-[30px] w-[120px] -translate-x-1/2 sm:-bottom-[100%] sm:h-[35px] sm:w-[150px] md:h-[38px] md:w-[170px] lg:h-[40px] lg:w-[188px]">
                  <Image
                    src="/images/kakao_login_image.png"
                    alt="kakao_login"
                    width={188}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
