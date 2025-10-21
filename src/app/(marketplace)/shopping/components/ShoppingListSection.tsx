'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardSubtitle,
  CardTitle,
  BookmarkButton,
  Line,
  StatusTag,
} from '@/components';
import { ShoppingContentType } from '@/types/meetingsType';
import { timeFormatter } from '@/utils/timeFormetter';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NonShoppingList } from './NonShoppingList';

export const ShoppingListSection = ({
  shoppingList,
}: {
  shoppingList: ShoppingContentType[] | null;
}) => {
  const router = useRouter();

  const onClickCard = (id: string) => {
    router.push(`/shopping/${id}`);
  };

  // 게시글이 없을 때의 빈 상태
  if (!shoppingList || shoppingList.length === 0) {
    return <NonShoppingList />;
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      {shoppingList?.map((shopping) => (
        <Card
          key={shopping.id}
          className="border-gray-10 cursor-pointer rounded-xl border p-6"
          height="auto"
          width="auto"
          onClick={() => onClickCard(shopping.id.toString())}
        >
          <CardContent className="pt-16">
            <StatusTag
              status={shopping.status}
              className="absolute top-0 left-0"
            />

            <BookmarkButton
              className={`${shopping.bookmarked ? 'text-primary fill-primary' : 'text-gray-40 fill-gray-40'} absolute top-[4px] right-0`}
            />
            <CardTitle className="font-memomentKkukkkuk line-clamp-2">
              {shopping.title}
            </CardTitle>
            <CardSubtitle className="text-text-sub2 flex items-center gap-1 text-sm">
              <span>{shopping.user.userName}</span>
              <span>・</span>
              <span>{timeFormatter(shopping.createdAt)}</span>
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
