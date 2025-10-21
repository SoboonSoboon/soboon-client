'use client';

import Image from 'next/image';
import { Button, StatusTag } from '@/components';
import { EllipsisVertical, MapPin, Bookmark } from 'lucide-react';
import { useState, useRef } from 'react';
import { ActionMenu } from './ActionMenu/ActionMenu';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { ApplicantsList } from './applicants/ApplicantsList';
import { applyMeeting, handleCloseMeeting } from '@/action/applicantsAction';
import { useToast } from '@/components/Atoms';
import { useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  cancelApplyMeeting,
  getUserApplayStatus,
} from '@/apis/meetings/userApplayStatusApi';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  postBookmarkedMeetingApi,
  deleteBookmarkedMeetingApi,
} from '@/apis/meetings/bookmarkApi';

interface DetailAsideProps {
  meetingId: number;
  title: string;
  detail_address: string;
  current_member: number;
  total_member: number;
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
  isAuthor: boolean;
  participants: ApplicantsMemberType['data'][];
  bookmarked: boolean;
}

export const DetailAside = ({
  meetingId,
  title,
  detail_address,
  current_member,
  total_member,
  status,
  isAuthor,
  participants,
  bookmarked,
}: DetailAsideProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { id: meetingId } = useParams<{ id: string }>();
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  const handleApplyMeeting = async (applicationId: string) => {
    try {
      const response = await applyMeeting(null, applicationId);
      success(response.message || '모임을 신청했어요.');
      queryClient.invalidateQueries({ queryKey: ['userApplayStatus'] });
      return response;
    } catch (err) {
      error('모임 신청을 실패했어요.');
      throw err;
    }
  };

  const { mutate: handleCloseMeetingAction } = useMutation({
    mutationFn: () => handleCloseMeeting(meetingId),
    onSuccess: (response) => {
      success(response.message || '모임을 마감했어요.');
    },
    onError: (err) => {
      error('모임 마감을 실패했어요.');
      throw err;
    },
  });

  const { data: userApplayStatus } = useQuery({
    queryKey: ['userApplayStatus'],
    queryFn: () => getUserApplayStatus(),
  });

  const filteredStatus = useMemo(() => {
    if (userApplayStatus) {
      return userApplayStatus.find((status) => status.meetingId === +meetingId);
    }
    return null;
  }, [userApplayStatus, meetingId]);

  const { mutate: handleCancelApplyMeeting } = useMutation({
    mutationFn: (meetingId: string) => cancelApplyMeeting({ id: meetingId }),
    onSuccess: () => {
      success('모임 신청을 취소했어요.');
      queryClient.invalidateQueries({ queryKey: ['userApplayStatus'] });
    },
    onError: () => {
      error('모임 신청을 취소하지 못했어요.');
    },
  });
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const handleBookmarkClick = async () => {
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      if (previousState) {
        await deleteBookmarkedMeetingApi(meetingId);
      } else {
        await postBookmarkedMeetingApi(meetingId);
      }
    } catch (error) {
      console.error('찜 추가/취소 실패:', error);
    }
  };

  return (
    <aside className="flex w-[430px] flex-col gap-5">
      <div className="flex w-full justify-between">
        {/* 상태 바 */}
        <div>
          <StatusTag status={status} />
        </div>

        {/* 아이콘 버튼 */}
        <div className="relative flex cursor-pointer justify-center gap-2">
          <div className="flex justify-center p-1.5">
            <Bookmark
              className={`${isBookmarked ? 'text-primary fill-primary' : 'text-gray-40 fill-gray-40'} size-6`}
              onClick={handleBookmarkClick}
            />
          </div>
          <div
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="flex cursor-pointer rounded-lg p-1.5 hover:bg-[var(--GrayScale-Gray5)]"
          >
            <EllipsisVertical className="text-gray-30 size-6" />
          </div>
          {open && (
            <div className="absolute top-8 right-0 z-50">
              <ActionMenu
                onClose={() => setOpen(false)}
                buttonRef={buttonRef as React.RefObject<HTMLElement>}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-memomentKkukkkuk line-clamp-2 text-2xl">{title}</h2>
        <div className="flex items-center gap-2">
          {/* 추후 공용 컴포넌트 수정 후 교체 예정 */}
          <Image
            src={'/images/dummy_profile.png'}
            alt="profile"
            width={24}
            height={24}
            className="border-text-sub2 h-6 w-6 rounded-full border object-cover"
          />
          <span className="text-text-sub2">빵빵이와 옥지</span>
        </div>
      </div>

      <div className="bg-gray-10 h-[1px] w-full"></div>

      <div className="flex w-full justify-between">
        <div className="flex items-center gap-1">
          <MapPin className="text-gray-40 size-6" />
          <p>{detail_address}</p>
        </div>

        <div>
          <p>
            <span className="text-primary">
              {current_member}&nbsp;/&nbsp;{total_member}
            </span>
            &nbsp;명 모집중
          </p>
        </div>
      </div>

      {!isAuthor && (
        <div className="mb-5 flex gap-3">
          <Button
            label="찜"
            className="border-primary text-primary w-20 shrink-0"
          />
          {filteredStatus?.participationStatus === undefined ||
            (filteredStatus?.participationStatus === 'CANCELLED' && (
              <Button
                label="모임 신청"
                className="w-full text-white"
                backgroundColor="#ff4805"
                onClick={() => handleApplyMeeting(meetingId)}
              />
            ))}
          {filteredStatus?.participationStatus === 'APPLIED' && (
            <Button
              className="w-full text-white"
              backgroundColor="#ff4805"
              onClick={() => handleCancelApplyMeeting(meetingId)}
            >
              <div>
                <p className="text-sm">모임이 신청되었어요.</p>
                <p className="text-xs">다시 클릭하면 취소할 수 있어요.</p>
              </div>
            </Button>
          )}
          {filteredStatus?.participationStatus === 'APPROVED' && (
            <Button
              label="모임 신청이 승인되었어요."
              className="text-text-sub2 w-full !cursor-not-allowed"
              backgroundColor="#ff4805"
              disabled
            />
          )}
          {filteredStatus?.participationStatus === 'REJECTED' && (
            <Button
              label="모임 신청이 거절되었어요."
              backgroundColor="#ff4805"
              className="text-text-sub2 w-full !cursor-not-allowed"
              disabled
            />
          )}
        </div>
      )}

      <ApplicantsList isAuthor={isAuthor} participants={participants} />

      {isAuthor && status === 'RECRUITING' && (
        <Button
          label="모임 마감"
          className="w-full text-white"
          backgroundColor="#ff4805"
          onClick={() => handleCloseMeetingAction()}
        />
      )}

      {isAuthor && status === 'COMPLETED' && (
        <Button
          label="모집 완료"
          className="text-text-sub2 w-full !cursor-not-allowed"
          backgroundColor="#f5f5f5"
          disabled
        />
      )}
    </aside>
  );
};
