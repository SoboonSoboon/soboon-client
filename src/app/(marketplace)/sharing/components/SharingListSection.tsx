'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardSubtitle,
  CardTitle,
  BookmarkButton,
  Line,
  StatusTag,
} from '@/components';
import { MapPin } from 'lucide-react';
import {
  DividingContentType,
  DividingMeetingsType,
} from '@/types/meetingsType';
import { useEffect, useState } from 'react';
import { timeFormatter } from '@/utils/timeFormetter';
import { NonDividingList } from './NonDividingList';
import { useBookmark } from '@/hooks';

export const SharingListSection = ({
  sharingMettingList,
}: {
  sharingMettingList: DividingMeetingsType | null;
}) => {
  const [mettingList, setMettingList] = useState<DividingContentType[] | null>(
    null,
  );

  useEffect(() => {
    setMettingList(sharingMettingList?.content || null);
  }, [sharingMettingList]);

  const router = useRouter();
  const { handleBookmark } = useBookmark();

  const onClickCard = (id: string) => {
    router.push(`/sharing/${id}`);
  };

  if (mettingList?.length === 0) {
    return <NonDividingList />;
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {mettingList?.length === 0 ? (
        <div>
          <p>
            아직 모임이 없어요, <br />
            지금 바로 모임을 만들어보세요
          </p>
        </div>
      ) : (
        mettingList?.map((metting) => (
          <Card
            key={metting.groupId}
            onClick={() => onClickCard(metting.groupId.toString())}
            className="cursor-pointer"
          >
            <CardContent>
              <StatusTag
                status={metting.status}
                className="absolute top-3 left-3"
              />
              <BookmarkButton
                className="absolute top-4 right-0"
                liked={metting.bookmarked}
                onChange={() =>
                  handleBookmark(metting.groupId.toString(), metting.bookmarked)
                }
              />
              <CardImage
                alt="기본 카드"
                src={
                  !metting.image ||
                  (Array.isArray(metting.image) &&
                    metting.image.length === 0) ||
                  (typeof metting.image === 'string' &&
                    metting.image.includes('example'))
                    ? '/images/notFound_image.png'
                    : metting.image
                }
                className="border-gray-10 bg-gray-5 h-[200px] w-full rounded-lg border-1"
              />

              <CardTitle className="font-memomentKkukkkuk line-clamp-1">
                {metting.item}
              </CardTitle>
              <CardSubtitle className="text-text-sub2 flex items-center gap-1 text-sm">
                <span>{metting.user.userName}</span>
                <span>・</span>
                <span>{timeFormatter(metting.createdAt)}</span>
              </CardSubtitle>
            </CardContent>
            <Line />
            <CardFooter>
              <div className="mb-2 flex items-center gap-1 text-sm">
                <MapPin className="text-gray-40 size-4" />
                <p>{metting.location.detail}</p>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};
