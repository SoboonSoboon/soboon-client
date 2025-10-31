'use client';

import {
  approveApplicants,
  kickApplicants,
  rejectApplicants,
} from '@/action/applicantsAction';
import { getUserApplyStatus } from '@/apis';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { axiosInstance } from '@/apis/axiosInstance';

import { Button, ProfileImg } from '@/components';
import { useToast } from '@/components/Atoms';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { StatusString } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

interface ApplicantsListProps {
  isAuthor: boolean;
  participants: ApplicantsMemberType['data'][];
  status: StatusString;
}

export const ApplicantsList = ({
  isAuthor,
  participants,
  status,
}: ApplicantsListProps) => {
  const { id: meetingId } = useParams<{ id: string }>();
  const { success, error } = useToast();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const handleApproveApplicants = async (applicationId: number) => {
    const response = await approveApplicants(null, applicationId, meetingId);
    if (response) {
      success(response.message || '모임 신청을 수락했어요.');
    } else {
      error(response.message || '모임 신청을 수락하지 못했어요.');
    }
  };

  const handleKickApplicants = async (applicationId: number) => {
    const response = await kickApplicants(null, applicationId, meetingId);
    if (response) {
      success(response.message || '참여자를 강퇴했어요.');
    } else {
      error(response.message || '참여자를 강퇴하지 못했어요.');
    }
  };

  const handleRejectApplicants = async (applicationId: number) => {
    const response = await rejectApplicants(null, applicationId, meetingId);
    if (response) {
      success(response.message || '모임 신청을 거절했어요.');
    } else {
      error(response.message || '모임 신청을 거절하지 못했어요.');
    }
  };

  const isCompletedOrClosed = status === 'COMPLETED' || status === 'CLOSED';

  // 내가 이 모임에 신청한 상태를 조회
  const { data: myApplyStatus } = useQuery({
    queryKey: ['myApplyStatus', meetingId],
    queryFn: async () => {
      const response = await getUserApplyStatus();
      return response.find((status) => status.meetingId === +meetingId) || null;
    },
    enabled: isLoggedIn,
  });

  // 이 모임에 신청한 사람들을 조회
  const { data: approvedParticipants } = useQuery<
    ApplicantsMemberType['data'][]
  >({
    queryKey: ['approvedParticipants', meetingId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/v1/meetings/${meetingId}/applicants`,
      );
      return response.data.data || [];
    },
    enabled:
      isCompletedOrClosed && myApplyStatus?.participationStatus === 'APPROVED',
  });

  // 이 모임에 신청한 사람들 중 참여 확정된 사람들만 필터링
  const filteredParticipants = useMemo(() => {
    return approvedParticipants?.filter(
      (participant) => participant.status === 'APPROVED',
    );
  }, [approvedParticipants]);

  return (
    <>
      {isAuthor && !isCompletedOrClosed && (
        <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
          {participants.length === 0 && (
            <div className="text-text-sub2 flex min-h-[143px] items-center justify-center">
              <p>아직 참여 신청한 사람이 없어요 ... !</p>
            </div>
          )}

          {participants.length > 0 &&
            participants.map((participant) => (
              <div
                key={participant.participantId}
                className="flex items-center justify-between px-6 py-3"
              >
                <div className="flex items-center gap-2 py-2">
                  <ProfileImg
                    profileImageUrl={participant.profileImageUrl}
                    size={32}
                  />
                  <p>{participant.userNickname}</p>
                </div>

                {/* 참여자 수락 상태 */}
                {participant.status === 'APPROVED' && (
                  <div className="flex items-center gap-2.5">
                    <div className="text-primary text-sm font-semibold">
                      참여 확정
                    </div>
                    <Button
                      label="강퇴"
                      size="small"
                      className="!border-text-sub2 !text-text-sub2"
                      variant="outline"
                      onClick={() =>
                        handleKickApplicants(participant.participantId)
                      }
                    />
                  </div>
                )}

                {/* 참여자 신청 대기 상태 */}
                {participant.status === 'APPLIED' && (
                  <div className="flex gap-2">
                    <Button
                      label="수락"
                      size="small"
                      variant="outline"
                      onClick={() =>
                        handleApproveApplicants(participant.participantId)
                      }
                    />
                    <Button
                      label="거절"
                      className="!border-text-sub2 !text-text-sub2"
                      variant="outline"
                      size="small"
                      onClick={() =>
                        handleRejectApplicants(participant.participantId)
                      }
                    />
                  </div>
                )}

                {/* 참여자 강퇴 상태 */}
                {participant.status === 'KICKED' && (
                  <div className="text-text-sub2 text-sm font-semibold">
                    강퇴된 참여자
                  </div>
                )}

                {/* 참여자 거절 상태 */}
                {participant.status === 'REJECTED' && (
                  <div className="text-text-sub2 text-sm font-semibold">
                    거절된 참여자
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {isAuthor && isCompletedOrClosed && (
        <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
          {filteredParticipants?.map((participant) => (
            <div
              key={participant.participantId}
              className="flex items-center justify-between px-6 py-3"
            >
              <div className="flex items-center gap-2 py-2">
                <ProfileImg
                  profileImageUrl={participant.profileImageUrl}
                  size={32}
                />
                <p>{participant.userNickname}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="text-primary text-sm font-semibold">
                  참여 확정
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isAuthor &&
        myApplyStatus?.participationStatus === 'APPROVED' &&
        isCompletedOrClosed && (
          <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
            {filteredParticipants?.map((participant) => (
              <div
                key={participant.participantId}
                className="flex items-center justify-between px-6 py-3"
              >
                <div className="flex items-center gap-2 py-2">
                  <ProfileImg
                    profileImageUrl={participant.profileImageUrl}
                    size={32}
                  />
                  <p>{participant.userNickname}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="text-primary text-sm font-semibold">
                    참여 확정
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {!isAuthor &&
        myApplyStatus?.participationStatus !== 'APPROVED' &&
        isCompletedOrClosed && (
          <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
            <div className="text-text-sub2 flex min-h-[143px] items-center justify-center">
              <div>
                <p>모집이 종료되었어요.</p>
                <p>참여가 확정된 사람만 볼 수 있어요.</p>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
