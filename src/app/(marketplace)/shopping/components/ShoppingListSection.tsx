'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
  LikeButton,
} from '@/components';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ShoppingListSection = () => {
  const router = useRouter();

  const onClickCard = (id: string) => {
    router.push(`/shopping/${id}`);
  };

  return (
    <div className="grid grid-cols-4 gap-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card
          className="cursor-pointer"
          height="auto"
          width="auto"
          key={index}
          onClick={() => onClickCard((index + 1).toString())}
        >
          <CardContent>
            <LikeButton />
            <CardImage
              alt="기본 카드"
              src="/images/item_dummy_image.png"
              className="h-[200px] w-full"
            />
            <div className="mb-2 flex items-center gap-1 text-sm">
              <MapPin className="size-4" />
              <p>성수역</p>
            </div>
            <CardTitle className="font-memomentKkukkkuk line-clamp-1">
              비건 집밥러 건대 이마트에서 장볼건데 무 반띵하실 분?!
            </CardTitle>
          </CardContent>
          <CardFooter className="text-text-sub2 text-sm">
            <span>빵빵이와 옥지</span> <span>1시간 전</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
