'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardSubtitle,
  CardTitle,
  Chip,
  LikeButton,
  Line,
} from '@/components';
import { MapPin } from 'lucide-react';
import {
  DividingContentType,
  DividingMeetingsType,
} from '@/types/meetingsType';
import { useEffect, useState } from 'react';

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

  const onClickCard = (id: string) => {
    router.push(`/sharing/${id}`);
  };

  const getStatus = (metting: DividingContentType) => {
    return metting.status === 'RECRUITING'
      ? '모집중'
      : metting.status === 'COMPLETED'
        ? '완료'
        : '취소됨';
  };

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
              {/* 추후 미성님 컴포넌트로 수정 필요 */}
              <Chip className="absolute top-4 left-4 px-3 py-1.5">
                {getStatus(metting)}
              </Chip>
              <LikeButton />
              <CardImage
                alt="기본 카드"
                src={
                  metting.image.includes('example')
                    ? '/images/notFound_image.png'
                    : metting.image
                }
                className="h-[200px] w-full"
              />

              <CardTitle className="font-memomentKkukkkuk line-clamp-1">
                {metting.item}
              </CardTitle>
              {/* 추후 백엔드 코드 수정 후 사용자 이름 추가 필요 및 타임스탬프 형식 변경 필요 */}
              <CardSubtitle className="text-text-sub2 text-sm">
                <span>-사용자 이름-</span> <span>1시간 전</span>
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
