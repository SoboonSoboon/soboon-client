'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardSubtitle,
  CardTitle,
  LikeButton,
  Line,
  StatusTag,
} from '@/components';
import { ShoppingContentType } from '@/types/meetingsType';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ShoppingListSection = ({
  shoppingList,
}: {
  shoppingList: ShoppingContentType[] | null;
}) => {
  const router = useRouter();

  const onClickCard = (id: string) => {
    router.push(`/shopping/${id}`);
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      {shoppingList?.map((shopping, index) => (
        <Card
          className="cursor-pointer p-6"
          height="auto"
          width="auto"
          key={index}
          onClick={() => onClickCard((index + 1).toString())}
        >
          <CardContent className="pt-16">
            <StatusTag
              status={shopping.status}
              className="absolute top-0 left-0"
            />
            <LikeButton className="absolute top-[4px] right-0" />
            <CardTitle className="font-memomentKkukkkuk line-clamp-2">
              {shopping.title}
            </CardTitle>
            {/* 백엔드 코드 추가되면 사용자 이름 추가 필요 및 타임스탬프 형식 변경 필요 */}
            <CardSubtitle>
              <span>-사용자 이름-</span> <span>1시간 전</span>
            </CardSubtitle>
          </CardContent>
          <Line className="mt-6" />
          <CardFooter className="text-text-sub2 text-sm">
            <div className="mb-2 flex items-center gap-1 text-sm">
              <MapPin className="size-4" />
              <p>{shopping.location.district}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
