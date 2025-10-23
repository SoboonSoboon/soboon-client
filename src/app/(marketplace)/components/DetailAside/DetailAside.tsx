'use client';

import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { ApplicantsList } from '../applicants/ApplicantsList';
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
import { ApplyStatusButtonSection } from './ApplyStatusButtonSection';
import { AuthorStatusButtonSection } from './AuthorStatusButtonSection';
import { MeetingDetailType } from '@/types/meetingsType';
import { CurrentPeople } from './CurrentPeople';
import { AsideHeader } from './AsideHeader';
import { AsideMoreInfo } from './AsideMoreInfo';

interface DetailAsideProps {
  meetingDetail: MeetingDetailType;
  isAuthor: boolean;
  participants: ApplicantsMemberType['data'][];
}

export const DetailAside = ({
  meetingDetail,
  isAuthor,
  participants,
}: DetailAsideProps) => {
  const [isBookmarked, setIsBookmarked] = useState(meetingDetail.bookmarked);
  const { id: meetingId } = useParams<{ id: string }>();
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  const handleBookmarkClick = async () => {
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      if (previousState) {
        await deleteBookmarkedMeetingApi(+meetingId);
        success('북마크에서 삭제되었어요.');
      } else {
        await postBookmarkedMeetingApi(+meetingId);
        success('북마크에 추가되었어요.');
      }
    } catch (err) {
      console.error('찜 추가/취소 실패:', err);
      error('찜 추가/취소 실패했어요.');
    }
  };

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

  return (
    <aside className="flex w-[430px] flex-col gap-5">
      <AsideMoreInfo
        status={meetingDetail?.status}
        isBookmarked={isBookmarked}
        handleBookmarkClick={handleBookmarkClick}
        meetingId={meetingId}
      />

      <AsideHeader
        title={meetingDetail?.title}
        profileImageUrl={meetingDetail?.user.profile}
        userName={meetingDetail?.user.userName}
      />

      <div className="bg-gray-10 h-[1px] w-full"></div>

      <div className="flex w-full justify-between">
        <div className="flex items-center gap-1">
          <MapPin className="text-gray-40 size-6" />
          <p>{meetingDetail?.detail_address}</p>
        </div>

        <CurrentPeople
          currentMember={meetingDetail?.current_member}
          totalMember={meetingDetail?.total_member}
        />
      </div>

      {!isAuthor && (
        <ApplyStatusButtonSection
          filteredStatus={filteredStatus}
          handleApplyMeeting={handleApplyMeeting}
          handleCancelApplyMeeting={handleCancelApplyMeeting}
          meetingId={meetingId}
        />
      )}

      <ApplicantsList isAuthor={isAuthor} participants={participants} />

      {isAuthor && (
        <AuthorStatusButtonSection
          status={meetingDetail?.status}
          handleCloseMeetingAction={handleCloseMeetingAction}
        />
      )}
    </aside>
  );
};
