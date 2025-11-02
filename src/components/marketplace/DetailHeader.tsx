'use client';

import { ChevronLeft } from '@/components/Atoms/icons';
import { useRouter } from 'next/navigation';

export const DetailHeader = () => {
  const router = useRouter();
  return (
    <div
      className="mt-[-20px] flex cursor-pointer items-center gap-2 py-4"
      onClick={() => router.back()}
    >
      <ChevronLeft className="text-text-sub2 size-6" />
      <span className="text-text-sub2">목록</span>
    </div>
  );
};
