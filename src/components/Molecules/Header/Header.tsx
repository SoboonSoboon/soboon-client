'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Logo, ProfileImg, UserMenuModal } from '../../Atoms';
import { redirectToKakao } from '@/apis/auth/authApi';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useState } from 'react';
import Image from 'next/image';

// TODO: 과도한 Image 태그 사용으로 추후 리팩토링 예정
const MENU_ICONS = {
  SHARING: {
    DEFAULT: '/icons/shopping_basket.svg',
    GREEN: '/icons/shopping_basket_green.svg',
  },
  SHOPPING: {
    DEFAULT: '/icons/sharing_cart.svg',
    GREEN: '/icons/sharing_cart_green.svg',
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
          {isLoggedIn ? (
            <Link href="/">
              <Logo />
            </Link>
          ) : (
            <>
              <Logo />
            </>
          )}

          <nav className="flex items-center gap-6 text-base font-normal">
            {isLoggedIn ? (
              <>
                <Link
                  href="/sharing"
                  className={`group hover:text-primary flex items-center gap-1 whitespace-nowrap ${
                    pathname.startsWith('/sharing') ? 'text-primary' : ''
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={
                        pathname.startsWith('/sharing')
                          ? MENU_ICONS.SHARING.GREEN
                          : MENU_ICONS.SHARING.DEFAULT
                      }
                      alt="Sharing Cart"
                      width={20}
                      height={20}
                      className="transition-opacity duration-200 group-hover:opacity-0"
                    />
                    <Image
                      src={MENU_ICONS.SHARING.GREEN}
                      alt="Sharing Cart"
                      width={20}
                      height={20}
                      className="absolute top-0 left-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </div>
                  <span className="font-memomentKkukkkuk">함께 소분하기</span>
                </Link>
                <Link
                  href="/shopping"
                  className={`group hover:text-primary flex items-center gap-1 whitespace-nowrap ${
                    pathname.startsWith('/shopping') ? 'text-primary' : ''
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={
                        pathname.startsWith('/shopping')
                          ? MENU_ICONS.SHOPPING.GREEN
                          : MENU_ICONS.SHOPPING.DEFAULT
                      }
                      alt="Shopping Basket"
                      width={24}
                      height={24}
                      className="transition-opacity duration-200 group-hover:opacity-0"
                    />
                    <Image
                      src={MENU_ICONS.SHOPPING.GREEN}
                      alt="Shopping Basket"
                      width={24}
                      height={24}
                      className="absolute top-0 left-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </div>
                  <span className="font-memomentKkukkkuk">함께 장보기</span>
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
