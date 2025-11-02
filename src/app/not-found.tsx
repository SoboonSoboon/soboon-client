'use client';

import { Button } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-15rem)] flex-col items-center justify-center gap-5 px-4 py-20">
      <Image
        src="/images/error_400_image.svg"
        alt="페이지를 찾을 수 없습니다"
        width={200}
        height={200}
        className="mx-auto"
      />
      <div className="text-center">
        <h1 className="font-memomentKkukkkuk mb-2 text-2xl font-bold sm:text-3xl">
          404
        </h1>
        <p className="text-text-sub2 text-sm sm:text-base">
          요청하신 페이지를 찾을 수 없어요.
          <br />
          입력하신 주소가 올바른지 확인해 주세요!
        </p>
      </div>
      <Link href="/">
        <Button label="홈으로" variant="outline" />
      </Link>
    </div>
  );
}
