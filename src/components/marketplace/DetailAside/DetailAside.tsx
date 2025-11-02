'use client';

import { MapPin } from '@/components/Atoms/icons';
import { useState } from 'react';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { ApplicantsList } from '../applicants/ApplicantsList';
import { applyMeeting, handleCloseMeeting } from '@/action/applicantsAction';
import { Button, useToast } from '@/components/Atoms';
import { Modal, useModal } from '@/components/Molecules';
import { useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  cancelApplyMeeting,
  getUserApplyStatus,
  redirectToKakao,
} from '@/apis';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useBookmark } from '@/hooks';
import { ApplyStatusButtonSection } from './ApplyStatusButtonSection';
import { AuthorStatusButtonSection } from './AuthorStatusButtonSection';
import { MeetingDetailType } from '@/types/meetingsType';
import { CurrentPeople } from './CurrentPeople';
import { AsideHeader } from './AsideHeader';
import { AsideMoreInfo } from './AsideMoreInfo';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { MODAL_IS_LOGIN_REQUIRED_TEXT } from '@/constants';

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
  const { handleBookmark } = useBookmark();
  const userId = useAuthStore((state) => state.userId);
  const deleteModal = useModal();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleBookmarkClick = () => {
    if (!isLoggedIn) {
      handleOpenLoginModal();
      return;
    } else {
      setIsBookmarked(!isBookmarked);
      handleBookmark(meetingId.toString(), isBookmarked);
    }
  };

  // todo: 모임 신청 로직 수정
  const handleApplyMeeting = async (applicationId: string) => {
    if (!isLoggedIn) {
      handleOpenLoginModal();
      return;
    } else {
      try {
        const response = await applyMeeting(null, applicationId);
        success(response.message || '모임을 신청했어요.');
        queryClient.invalidateQueries({ queryKey: ['userApplyStatus'] });
        return response;
      } catch (err) {
        error('모임 신청을 실패했어요.');
        throw err;
      }
    }
  };

  const handleOpenLoginModal = () => {
    deleteModal.open();
  };

  const handleLoginButtonClick = () => {
    redirectToKakao();
    deleteModal.close();
  };

  const { mutate: handleCloseMeetingAction } = useMutation({
    mutationFn: async () => {
      if (meetingDetail?.current_member === 1) {
        throw new Error('참여자 미달 오류');
      }
      const response = await handleCloseMeeting(meetingId);
      return response;
    },
    onSuccess: (response) => {
      success(response.message || '모임을 마감했어요.');
    },
    onError: (err) => {
      if (err.message === '참여자 미달 오류') {
        error('참여자가 1명 이상 있어야 모임을 마감할 수 있어요.');
      } else {
        error('모임 마감을 실패했어요.');
      }
      throw err;
    },
  });

  const { data: userApplyStatus } = useQuery({
    queryKey: ['userApplyStatus', userId],
    queryFn: () => getUserApplyStatus(),
    enabled: isLoggedIn,
  });

  const filteredStatus = useMemo(() => {
    if (userApplyStatus) {
      return userApplyStatus.find((status) => status.meetingId === +meetingId);
    }
    return null;
  }, [userApplyStatus, meetingId]);

  // todo: 중복 실행에 대해 생각해보기.
  const { mutate: handleCancelApplyMeeting } = useMutation({
    mutationFn: (meetingId: string) => cancelApplyMeeting({ id: meetingId }),
    onSuccess: () => {
      success('모임 신청을 취소했어요.');
      queryClient.invalidateQueries({ queryKey: ['userApplyStatus'] });
    },
    onError: () => {
      error('모임 신청을 취소하지 못했어요.');
    },
  });

  return (
    <aside className="flex flex-col gap-5">
      <div className="flex flex-col gap-3.5">
        <AsideMoreInfo
          status={meetingDetail?.status}
          isBookmarked={isBookmarked}
          handleBookmarkClick={handleBookmarkClick}
          meetingId={meetingId}
          isAuthor={isAuthor}
        />
        <AsideHeader
          title={meetingDetail?.title}
          profileImageUrl={meetingDetail?.user.profile}
          userName={meetingDetail?.user.userName}
          createdAt={meetingDetail?.createdAt}
          tags={meetingDetail?.tags}
        />
      </div>

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

      <ApplicantsList
        isAuthor={isAuthor}
        participants={participants}
        status={meetingDetail?.status}
      />

      {!isAuthor && (
        <ApplyStatusButtonSection
          status={meetingDetail?.status}
          filteredStatus={filteredStatus}
          handleApplyMeeting={handleApplyMeeting}
          handleCancelApplyMeeting={handleCancelApplyMeeting}
          meetingId={meetingId}
        />
      )}

      {isAuthor && (
        <AuthorStatusButtonSection
          status={meetingDetail?.status}
          handleCloseMeetingAction={handleCloseMeetingAction}
        />
      )}

      <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.close} size="sm">
        <div
          className="flex flex-col items-center p-7 pb-5"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <h2 className="mb-2 text-[22px] font-semibold">
            {MODAL_IS_LOGIN_REQUIRED_TEXT.LOGIN_COMMENT_TITLE}
          </h2>
          <p className="text-text-main mb-8 text-center">
            {MODAL_IS_LOGIN_REQUIRED_TEXT.LOGIN_COMMENT_LIST}
          </p>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              onClick={() => {
                deleteModal.close();
              }}
              className="w-full"
              label="취소"
              aria-label="취소 버튼"
            />
            <Button
              variant="filled"
              label="로그인"
              onClick={handleLoginButtonClick}
              className="w-full"
              aria-label="로그인 버튼"
            />
          </div>
        </div>
      </Modal>
    </aside>
  );
};
