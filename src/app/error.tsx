'use client';

import { useEffect } from 'react';
import { Button } from '@/components/Atoms';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // 에러 로깅 (선택사항)
    console.error('Error:', error);
  }, [error]);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-[calc(100vh-15rem)] flex-col items-center justify-center gap-5 px-4 py-20">
      <Image
        src="/images/error_500_image.svg"
        alt="서버 에러"
        width={200}
        height={200}
        className="mx-auto"
      />
      <div className="text-center">
        <h1 className="font-memomentKkukkkuk mb-2 text-2xl font-bold sm:text-3xl">
          오류가 발생했어요.
        </h1>
        <p className="text-text-sub2 mb-4 text-sm sm:text-base">
          서버가 잠시 멈췄어요.
          <br />
          기술팀이 이미 달려가고 있어요!
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <p className="text-text-line2 mb-4 text-xs">{error.message}</p>
        )}
      </div>
      <div className="flex gap-3">
        <Button
          label="다시 시도"
          aria-label="다시 시도"
          onClick={reset}
          variant="filled"
        />
        <Button
          label="홈으로"
          aria-label="홈으로"
          onClick={handleGoHome}
          variant="outline"
        />
      </div>
    </div>
  );
}
