'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Button,
  Logo,
  ProfileImg,
  UserMenuModal,
  Icon,
} from '@/components/Atoms';
import { redirectToKakao } from '@/apis/auth/authApi';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useState } from 'react';

const MENU_ICONS = {
  SHARING: {
    LABEL: '함께 소분하기',
    PATH: '/sharing',
    SIZE: 20,
    ICON: {
      DEFAULT: 'shopping-basket' as const,
      GREEN: 'shopping-basket-green' as const,
    },
  },
  SHOPPING: {
    LABEL: '함께 장보기',
    PATH: '/shopping',
    SIZE: 24,
    ICON: {
      DEFAULT: 'sharing-cart' as const,
      GREEN: 'sharing-cart-green' as const,
    },
  },
} as const;

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
                {Object.entries(MENU_ICONS).map(([key, menu]) => (
                  <Link
                    key={key}
                    href={menu.PATH}
                    className={`group hover:text-primary flex items-center gap-1 whitespace-nowrap ${
                      pathname.startsWith(menu.PATH) ? 'text-primary' : ''
                    }`}
                  >
                    <Icon
                      type={
                        pathname.startsWith(menu.PATH)
                          ? menu.ICON.GREEN
                          : menu.ICON.DEFAULT
                      }
                      size={menu.SIZE}
                      className="transition-colors duration-200 group-hover:opacity-80"
                    />
                    <span className="font-memomentKkukkkuk">{menu.LABEL}</span>
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
