'use client';

import { StatusTag } from '@/components/Atoms';
import {
  Card,
  CardContent,
  CardFooter,
  CardSubtitle,
  CardTitle,
  Line,
  MainEmptyState,
  MainShoppingCardSkeleton,
} from '@/components/Molecules';
import { ShoppingMeetingsType } from '@/types/meetingsType';
import { timeFormatter } from '@/utils';
import { MapPin } from '@/components/Atoms/icons';
import { useRouter } from 'next/navigation';

import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getShoppingListApi } from '@/apis/meetings/getShoppingListApi';
import { useInfiniteScrollTrigger } from '@/hooks/useScroll';
import { useSearchParams } from 'next/navigation';
import { HashTag } from './HashTag';
import { useShoppingSearch } from '@/hooks/useSearch/useShoppingSearch';

export const ShoppingListSection = ({
  initialShoppingList,
}: {
  initialShoppingList: ShoppingMeetingsType | null;
}) => {
  const router = useRouter();
  const { isBottom } = useInfiniteScrollTrigger();
  const searchParams = useSearchParams();
  const { search } = useShoppingSearch();

  const keyword = searchParams.get('keyword');
  const isSearchMode = !!keyword;

  const query = new URLSearchParams({
    province: searchParams.get('province') || '',
    city: searchParams.get('city') || '',
    district: searchParams.get('district') || '',
    status: searchParams.get('status') || '',
    sortType: searchParams.get('sortType') || '',
    tags: searchParams.get('tags') || '',
    size: searchParams.get('size') || '10',
    page: searchParams.get('page') || '0',
    keyword: keyword || '',
  });

  const {
    data: shoppingList,
    isPending,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<ShoppingMeetingsType>({
    queryKey: ['shoppingList', query.toString()],
    queryFn: async ({ pageParam }) => {
      // 검색 모드일 때는 검색 API 사용
      if (isSearchMode) {
        const response = await search(keyword, pageParam as number);
        return response.data;
      } else {
        // 일반 모드일 때는 기존 API 사용
        const urlParams = new URLSearchParams(query);
        urlParams.set('page', (pageParam as number).toString());
        const response = await getShoppingListApi(urlParams);
        return response.data;
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pageInfo?.hasNext) {
        const nextPage = lastPage.pageInfo.currentPage;
        return nextPage;
      }

      return undefined;
    },
    initialData:
      !isSearchMode && initialShoppingList
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

  // 반응형 컬럼 수 계산
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 4;
      if (width >= 768) return 3;
      if (width >= 640) return 2;
      return 1;
    };

    const updateColumns = () => setColumnCount(calculateColumns());
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const items = useMemo(
    () => shoppingList?.pages.flatMap((page) => page.content) ?? [],
    [shoppingList],
  );

  // 가로 우선(좌→우, 위→아래) 순서를 위해 라운드로빈으로 컬럼 분배
  const columns = useMemo(() => {
    const cols: (typeof items)[] = Array.from(
      { length: columnCount },
      () => [],
    );
    items.forEach((item, index) => {
      cols[index % columnCount].push(item);
    });
    return cols;
  }, [items, columnCount]);

  if (isPending || (isFetching && items.length === 0)) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
        {Array.from({ length: columnCount }).map((_, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4 md:gap-5">
            {Array.from({ length: Math.ceil(8 / columnCount) }).map(
              (_, idx) => (
                <MainShoppingCardSkeleton key={idx} />
              ),
            )}
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <MainEmptyState
        description="조건에 맞는 모임이 없어요"
        primaryButton={{
          text: '모임 만들기',
          href: '/shopping/register',
          variant: 'filled',
        }}
        padding="py-[52px]"
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4 md:gap-5">
            {col.map((shopping) => (
              <Card
                key={shopping.id}
                className="border-gray-10 flex cursor-pointer flex-col gap-3 rounded-xl border p-6"
                onClick={() => onClickCard(shopping.id.toString())}
              >
                <StatusTag status={shopping.status} />
                <CardContent className="flex flex-col gap-3">
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
                      <HashTag tags={shopping.tags} />
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
        ))}
      </div>
      <p className="text-text-sub2 mt-6 text-center text-sm">
        {isFetchingNextPage && '로딩 중이예요 ...'}
        {!hasNextPage && '모든 게시글을 불러왔어요 👋'}
      </p>
    </>
  );
};
