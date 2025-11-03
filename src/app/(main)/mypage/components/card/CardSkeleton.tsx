import { Skeleton } from '@/components/Atoms';

export const DividingCardSkeleton = () => (
  <div
    className={
      'h-full w-full flex-shrink-0 cursor-pointer overflow-hidden bg-white'
    }
  >
    <div className="flex flex-col gap-[84px]">
      {/* 이미지 스켈레톤 */}

      <Skeleton className="inset-0 aspect-[3/2] h-full w-full" />

      {/* 컨텐츠 영역 */}
      <div className="flex flex-col gap-11">
        <hr className="text-gray-10" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

// 장보기 카드 스켈레톤 - 카드 border, 버튼, 위치만
export const ShoppingCardSkeleton = () => (
  <div
    className={
      'border-gray-10 flex break-inside-avoid flex-col gap-[44px] rounded-xl border p-6'
    }
  >
    {/* CardContent 영역 (빈 공간) */}
    <div className="h-16" />
    <hr className="text-gray-10" />
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
);
