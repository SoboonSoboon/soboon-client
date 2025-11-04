import { Skeleton } from './skeleton';

// 소분하기(Dividing) 카드 스켈레톤 - border + 이미지 영역 + 텍스트
export const DividingCardSkeleton = () => (
  <div className="cursor-pointer overflow-hidden rounded-lg bg-white">
    {/* 이미지 영역 */}
    <div className="border-gray-10 relative mb-5 overflow-hidden rounded-lg border">
      <div className="relative aspect-[3/2] w-full">
        <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />
      </div>
    </div>
    {/* 컨텐츠 영역 */}
    <div className="flex flex-col gap-2">
      <Skeleton className="h-6 w-3/4 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
    </div>
    {/* Line */}
    <div className="border-gray-10 my-3 border-t" />
    {/* Footer */}
    <div className="flex items-center gap-1">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 w-20 rounded" />
    </div>
  </div>
);

// 장보기(Shopping) 카드 스켈레톤 - border + 텍스트만
export const ShoppingCardSkeleton = () => (
  <div className="border-gray-10 flex cursor-pointer flex-col gap-3 rounded-xl border bg-white p-6">
    {/* StatusTag */}
    <Skeleton className="h-6 w-16 rounded-full" />
    {/* CardContent */}
    <div className="flex flex-col gap-3">
      <Skeleton className="h-6 w-4/5 rounded" />
      <Skeleton className="h-4 w-2/3 rounded" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
    {/* Line */}
    <div className="border-gray-10 border-t" />
    {/* Footer */}
    <div className="flex items-center gap-1">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 w-20 rounded" />
    </div>
  </div>
);

