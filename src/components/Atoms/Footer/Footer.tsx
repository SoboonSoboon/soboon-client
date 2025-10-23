'use client';

import Link from 'next/link';
import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className="mt-10 flex h-60.5 w-full items-center bg-[var(--GrayScale-Gray80)]">
      <div className="mx-auto flex w-[1200px] flex-col gap-4.5 text-[var(--GrayScale-Gray5)]">
        <Link href="/">
          <Logo width={75} height={28} className="text-white" />
        </Link>
        <div className="flex flex-col gap-2">
          <div>
            <strong>팀 소분소분 | </strong>
            <span>이영록 김동현 류미성 최지희 박성민 이정우 김나래</span>
          </div>
          <div>
            <strong>이메일 | </strong>
            <span>soboonsoboon@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
