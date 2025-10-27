'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardSubtitle,
  CardTitle,
  // BookmarkButton,
  Line,
  StatusTag,
} from '@/components';
import { ShoppingMeetingsType } from '@/types/meetingsType';
import { timeFormatter } from '@/utils';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NonShoppingList } from './NonShoppingList';
// import { useBookmark } from '@/hooks';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getShoppingListApi } from '@/apis/meetings/getShoppingListApi';
import { useInfiniteScrollTrigger } from '@/hooks/useScroll';
import { useSearchParams } from 'next/navigation';
import { HashTag } from './HashTag';

export const ShoppingListSection = ({
  initialShoppingList,
}: {
  initialShoppingList: ShoppingMeetingsType | null;
}) => {
  const router = useRouter();
  // const { handleBookmark } = useBookmark();
  const { isBottom } = useInfiniteScrollTrigger();
  const searchParams = useSearchParams();

  const query = new URLSearchParams({
    province: searchParams.get('province') || '',
    city: searchParams.get('city') || '',
    district: searchParams.get('district') || '',
    status: searchParams.get('status') || '',
    sortType: searchParams.get('sortType') || '',
    tags: searchParams.get('tag') || '',
    size: searchParams.get('size') || '10',
    page: searchParams.get('page') || '0',
  });

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
      <div className="columns-1 gap-4 space-y-4 md:columns-2 md:gap-5 md:space-y-5 xl:columns-4">
        {shoppingList.pages
          .flatMap((page) => page.content)
          .map((shopping) => (
            <Card
              key={shopping.id}
              className="border-gray-10 flex cursor-pointer break-inside-avoid flex-col gap-3 rounded-xl border p-6"
              onClick={() => onClickCard(shopping.id.toString())}
            >
              <StatusTag status={shopping.status} />
              <CardContent className="flex flex-col gap-3">
                {/* <BookmarkButton
                  className="absolute top-[4px] right-0"
                  liked={shopping.bookmarked}
                  onChange={() =>
                    handleBookmark(shopping.id.toString(), shopping.bookmarked)
                  }
                /> */}
                <CardTitle
                  className="font-memomentKkukkkuk line-clamp-2"
                  status={shopping.status as 'RECRUITING'}
                >
                  {shopping.title}
                </CardTitle>
                <CardSubtitle className="text-text-sub2 flex items-center gap-1 text-sm">
                  <span>{shopping.user.userName}</span>
                  <span>・</span>
                  <span>{timeFormatter(shopping.createdAt)}</span>
                </CardSubtitle>
                <div className="flex flex-wrap gap-x-2">
                  {shopping.tags && shopping.tags.length > 0 && (
                    <HashTag
                      tags={shopping.tags}
                      status={shopping.status as 'RECRUITING'}
                    />
                  )}
                </div>
              </CardContent>
              <Line />
              <CardFooter className="text-text-sub2 text-sm">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="size-4" />
                  <p>{shopping.location.district}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
      <p className="text-text-sub2 mt-6 text-center text-sm">
        {isFetchingNextPage && '로딩 중이예요 ...'}
        {!hasNextPage && '모든 게시글을 불러왔어요 👋'}
      </p>
    </>
  );
};
