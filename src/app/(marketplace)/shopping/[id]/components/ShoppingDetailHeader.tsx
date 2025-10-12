'use client';

import { useRouter } from 'next/navigation';

export const ShoppingDetailHeader = () => {
  const router = useRouter();
  return (
    <div className="px-4 py-3">
      <span
        className="text-text-sub2 cursor-pointer"
        onClick={() => router.back()}
      >
        목록
      </span>
    </div>
  );
};
