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
import { ShoppingMeetingsType } from '@/types/meetingsType';
import { timeFormatter } from '@/utils';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NonShoppingList } from './NonShoppingList';
import { useBookmark } from '@/hooks';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getShoppingListApi } from '@/apis/meetings/getShoppingListApi';
import { useInfiniteScrollTrigger } from '@/hooks/useScroll';

export const ShoppingListSection = ({
  initialShoppingList,
  query,
}: {
  query: URLSearchParams;
  initialShoppingList: ShoppingMeetingsType | null;
}) => {
  const router = useRouter();
  const { handleBookmark } = useBookmark();
  const { isBottom } = useInfiniteScrollTrigger();

  const {
    data: shoppingList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<ShoppingMeetingsType>({
    queryKey: ['shoppingList', query.toString()],
    queryFn: async ({ pageParam }) => {
      const urlParams = new URLSearchParams(query);
      urlParams.set('page', (pageParam as number).toString());

      const response = await getShoppingListApi(urlParams);

      const responseData = response.data;

      return responseData;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pageInfo?.hasNext) {
        const nextPage = lastPage.pageInfo.currentPage;
        return nextPage;
      }

      return undefined;
    },
    initialData: initialShoppingList
      ? {
          pages: [initialShoppingList],
          pageParams: [0],
        }
      : undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (isBottom && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isBottom, fetchNextPage, isFetchingNextPage]);

  const onClickCard = (id: string) => {
    router.push(`/shopping/${id}`);
  };

  if (!shoppingList || shoppingList.pages[0]?.content.length === 0) {
    return <NonShoppingList />;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {shoppingList.pages
          .flatMap((page) => page.content)
          .map((shopping) => (
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
                  className="absolute top-[4px] right-0"
                  liked={shopping.bookmarked}
                  onChange={() =>
                    handleBookmark(shopping.id.toString(), shopping.bookmarked)
                  }
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
      <p className="text-text-sub2 mt-6 text-center text-sm">
        {isFetchingNextPage && '로딩 중이예요 ...'}
        {!hasNextPage && '모든 게시글을 불러왔어요.'}
      </p>
    </>
  );
};
