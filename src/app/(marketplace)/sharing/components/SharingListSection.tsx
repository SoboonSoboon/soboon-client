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
import { timeFormatter } from '@/utils/timeFormetter';
import { NonDividingList } from './NonDividingList';
import { useBookmark } from '@/hooks';

export const SharingListSection = ({
  sharingMeetingList,
}: {
  sharingMeetingList: DividingMeetingsType | null;
}) => {
  const router = useRouter();
  const { handleBookmark } = useBookmark();

  const onClickCard = (id: string) => {
    router.push(`/sharing/${id}`);
  };
  const meetingList = sharingMeetingList?.content || [];

  if (meetingList?.length === 0) {
    return <NonDividingList />;
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {meetingList?.length === 0 ? (
        <div>
          <p>
            아직 모임이 없어요, <br />
            지금 바로 모임을 만들어보세요
          </p>
        </div>
      ) : (
        meetingList?.map((meeting) => (
          <Card
            key={meeting.groupId}
            onClick={() => onClickCard(meeting.groupId.toString())}
            className="cursor-pointer"
          >
            <CardContent>
              <StatusTag
                status={meeting.status}
                className="absolute top-3 left-3"
              />
              <BookmarkButton
                className="absolute top-4 right-0"
                liked={meeting.bookmarked}
                onChange={() =>
                  handleBookmark(meeting.groupId.toString(), meeting.bookmarked)
                }
              />
              <CardImage
                alt="기본 카드"
                src={
                  !meeting.image ||
                  (Array.isArray(meeting.image) &&
                    meeting.image.length === 0) ||
                  (typeof meeting.image === 'string' &&
                    meeting.image.includes('example'))
                    ? '/images/notFound_image.png'
                    : meeting.image
                }
                className="border-gray-10 bg-gray-5 h-[200px] w-full rounded-lg border-1"
              />

              <CardTitle className="font-memomentKkukkkuk line-clamp-1">
                {meeting.item}
              </CardTitle>
              <CardSubtitle className="text-text-sub2 flex items-center gap-1 text-sm">
                <span>{meeting.user.userName}</span>
                <span>・</span>
                <span>{timeFormatter(meeting.createdAt)}</span>
              </CardSubtitle>
            </CardContent>
            <Line />
            <CardFooter>
              <div className="mb-2 flex items-center gap-1 text-sm">
                <MapPin className="text-gray-40 size-4" />
                <p>{meeting.location.detail}</p>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};
