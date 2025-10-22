'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const DetailHeader = () => {
  const router = useRouter();
  return (
    <div className="py-4">
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => router.back()}
      >
        <div>
          <ChevronLeft className="text-text-sub2 size-6" />
        </div>
        <span className="text-text-sub2">목록</span>
      </div>
    </div>
  );
};
