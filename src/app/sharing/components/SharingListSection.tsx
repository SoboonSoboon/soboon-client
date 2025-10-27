'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardSubtitle,
  CardTitle,
  // BookmarkButton,
  Line,
  StatusTag,
} from '@/components';
import { MapPin } from 'lucide-react';
import { DividingMeetingsType } from '@/types/meetingsType';
import { timeFormatter } from '@/utils';

// import { useBookmark } from '@/hooks';
import { useInfiniteScrollTrigger } from '@/hooks/useScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getDividingListApi } from '@/apis/meetings/getDividingListApi';
import { useEffect } from 'react';
import { EmptyState } from '@/components/Molecules';

export const SharingListSection = ({
  initialDividingList,
  query,
}: {
  query: URLSearchParams;
  initialDividingList: DividingMeetingsType | null;
}) => {
  const router = useRouter();
  // const { handleBookmark } = useBookmark();
  const { isBottom } = useInfiniteScrollTrigger();

  const {
    data: dividingList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<DividingMeetingsType>({
    queryKey: ['dividingList', query.toString()],
    queryFn: async ({ pageParam }) => {
      const urlParams = new URLSearchParams(query);
      urlParams.set('page', (pageParam as number).toString());

      const response = await getDividingListApi(urlParams);

      const responseData = response.data;

      return responseData;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.sliceInfo?.hasNext) {
        const nextPage = lastPage.sliceInfo.currentPage;
        return nextPage;
      }

      return undefined;
    },
    initialData: initialDividingList
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
    router.push(`/sharing/${id}`);
  };

  if (!dividingList || dividingList.pages[0]?.content.length === 0) {
    return (
      <EmptyState
        type="main-dividing"
        title="아직 소분하기 모임이 없어요"
        description="첫 번째 소분하기 모임을 만들어보세요!"
        primaryButton={{
          text: '소분하기 모임 만들기',
          href: '/sharing/register',
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
                <div className="relative mb-5">
                  <StatusTag
                    status={dividing.status}
                    className="absolute top-3 left-3 z-10"
                  />
                  {/* <BookmarkButton
                  className="absolute top-4 right-0"
                  liked={dividing.bookmarked}
                  onChange={() =>
                    handleBookmark(
                      dividing.groupId.toString(),
                      dividing.bookmarked,
                    )
                  }
                /> */}
                  <CardImage
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
                    className="border-gray-10 bg-gray-5 h-[200px] w-full rounded-lg border-1"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle className="font-memomentKkukkkuk line-clamp-1">
                    {dividing.item}
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
                  <p>{dividing.location.detail}</p>
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
