'use client';

import {
  approveApplicants,
  kickApplicants,
  rejectApplicants,
} from '@/action/applicantsAction';
import { useAuthStore } from '@/apis/auth/hooks/authStore';

import { Button, ProfileImg } from '@/components';
import { useToast } from '@/components/Atoms';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { StatusString } from '@/types/common';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

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

  const userId = useAuthStore((state) => state.userId);

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

  const isApprovedParticipant = participants.some(
    (participant) =>
      participant.userId === userId && participant.status === 'APPROVED',
  );

  useEffect(() => {
    console.log('userId', userId);
    console.log('participants', participants);
    console.log('isAuthor', isAuthor);
    console.log('isApprovedParticipant', isApprovedParticipant);
    console.log('isCompletedOrClosed', isCompletedOrClosed);
  }, []);

  const filteredParticipants = useMemo(() => {
    return participants.filter(
      (participant) => participant.status === 'APPROVED',
    );
  }, [participants]);

  return (
    <>
      {isAuthor && (
        <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
          {participants.length === 0 && (
            <div className="text-text-sub2 flex min-h-[143px] items-center justify-center">
              <p>아직 참여 신청한 사람이 없어요 ... !</p>
            </div>
          )}

          {isCompletedOrClosed && !isApprovedParticipant && !isAuthor && (
            <div className="text-text-sub2 flex min-h-[143px] items-center justify-center">
              <div>
                <p>모집이 종료되었어요.</p>
                <p>참여가 확정된 사람만 볼 수 있어요.</p>
              </div>
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
                    {!isCompletedOrClosed && (
                      <Button
                        label="강퇴"
                        size="small"
                        className="!border-text-sub2 !text-text-sub2"
                        variant="outline"
                        onClick={() =>
                          handleKickApplicants(participant.participantId)
                        }
                      />
                    )}
                  </div>
                )}

                {!isCompletedOrClosed && (
                  <>
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
                      <div className="text-text-sub2 text-sm">
                        거절된 참여자
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
      )}

      {!isAuthor && isApprovedParticipant && isCompletedOrClosed && (
        <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
          {filteredParticipants.map((participant) => (
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
    </>
  );
};
