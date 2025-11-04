'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardSubtitle,
  CardTitle,
  Line,
  MainEmptyState,
} from '@/components/Molecules';
import { StatusTag } from '@/components/Atoms';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDividingSearch } from '@/hooks/useSearch/useDividingSearch';
import { useInfiniteScrollTrigger } from '@/hooks/useScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getDividingListApi } from '@/apis/meetings/getDividingListApi';
import { MapPin } from '@/components/Atoms/icons';
import { DividingMeetingsType } from '@/types/meetingsType';
import { timeFormatter } from '@/utils';
import { DividingCardSkeleton } from '@/components/Atoms';

export const DividingListSection = ({
  initialDividingList,
  query,
}: {
  query: URLSearchParams;
  initialDividingList: DividingMeetingsType | null;
}) => {
  const router = useRouter();
  const { isBottom } = useInfiniteScrollTrigger();
  const searchParams = useSearchParams();
  const { search } = useDividingSearch();

  const keyword = searchParams.get('keyword');
  const isSearchMode = !!keyword;

  const {
    data: dividingList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isPending,
  } = useInfiniteQuery<DividingMeetingsType>({
    queryKey: ['dividingList', query.toString()],
    queryFn: async ({ pageParam }) => {
      // 검색 모드일 때는 검색 API 사용
      if (isSearchMode) {
        const response = await search(keyword, pageParam as number);
        return response.data;
      } else {
        // 일반 모드일 때는 기존 API 사용 (페이지네이션 지원)
        const urlParams = new URLSearchParams(query);
        urlParams.set('page', (pageParam as number).toString());
        const response = await getDividingListApi(urlParams);
        return response.data;
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.sliceInfo?.hasNext) {
        const nextPage = lastPage.sliceInfo.currentPage;
        return nextPage;
      }
      return undefined;
    },
    initialData:
      !isSearchMode && initialDividingList
        ? {
            pages: [initialDividingList],
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
    router.push(`/dividing/${id}`);
  };

  // 로딩 상태 - 검색 모드이거나 initialData가 없을 때만 skeleton 표시
  if (isPending && (isSearchMode || !initialDividingList)) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <DividingCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!dividingList || dividingList.pages[0]?.content.length === 0) {
    return (
      <MainEmptyState
        title="아직 소분하기 모임이 없어요"
        description="첫 번째 소분하기 모임을 만들어보세요!"
        primaryButton={{
          text: '소분하기 모임 만들기',
          href: '/dividing/register',
          variant: 'filled',
        }}
        secondaryButton={{
          text: '장보기 모임 둘러보기',
          href: '/shopping',
          variant: 'outline',
        }}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {dividingList.pages
          .flatMap((page) => page.content)
          .map((dividing) => (
            <Card
              key={dividing.groupId}
              onClick={() => onClickCard(dividing.groupId.toString())}
              className="cursor-pointer"
            >
              <CardContent>
                <div className="border-gray-10 relative mb-5 overflow-hidden rounded-lg border">
                  <StatusTag
                    status={dividing.status}
                    className="absolute top-3 left-3 z-10"
                  />
                  <div
                    className="bg-gray-10 relative w-full"
                    style={{
                      contain: 'layout',
                      aspectRatio: '3/2',
                      minHeight: 0,
                    }}
                  >
                    <Image
                      alt="기본 카드"
                      src={
                        !dividing.image ||
                        (Array.isArray(dividing.image) &&
                          dividing.image.length === 0) ||
                        (typeof dividing.image === 'string' &&
                          dividing.image.includes('example'))
                          ? '/images/notFound_image.png'
                          : dividing.image
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="rounded-lg object-cover opacity-0 transition-opacity duration-300"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease, opacity 0.3s ease',
                      }}
                      onLoadingComplete={(img) => {
                        img.style.opacity = '1';
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      loading="lazy"
                      quality={75}
                      placeholder="empty"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle
                    className="font-memomentKkukkkuk line-clamp-1"
                    status={dividing.status as 'RECRUITING'}
                  >
                    {dividing.title}
                  </CardTitle>
                  <CardSubtitle className="text-text-sub2 flex items-center gap-1 text-sm">
                    <span>{dividing.user.userName}</span>
                    <span>・</span>
                    <span>{timeFormatter(dividing.createdAt)}</span>
                  </CardSubtitle>
                </div>
              </CardContent>
              <Line className="mt-3 mb-3" />
              <CardFooter>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="text-gray-40 size-4" />
                  <p>{dividing.location.district}</p>
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
