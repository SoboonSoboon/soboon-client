'use client';

import {
  approveApplicants,
  kickApplicants,
  rejectApplicants,
} from '@/action/applicantsAction';

import { Button, ProfileImg } from '@/components';
import { useToast } from '@/components/Atoms';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { useParams } from 'next/navigation';

interface ApplicantsListProps {
  isAuthor: boolean;
  participants: ApplicantsMemberType['data'][];
}

export const ApplicantsList = ({
  isAuthor,
  participants,
}: ApplicantsListProps) => {
  const { id: meetingId } = useParams<{ id: string }>();
  const { success, error } = useToast();

  const handleApproveApplicants = async (applicationId: number) => {
    const response = await approveApplicants(null, applicationId, meetingId);
    if (response) {
      console.log(response);
      success(response.message || '모임 신청을 수락했어요.');
    } else {
      error(response.message || '모임 신청을 수락하지 못했어요.');
    }
  };

  const handleKickApplicants = async (applicationId: number) => {
    const response = await kickApplicants(null, applicationId, meetingId);
    if (response) {
      console.log(response);
      success(response.message || '참여자를 강퇴했어요.');
    } else {
      error(response.message || '참여자를 강퇴하지 못했어요.');
    }
  };

  const handleRejectApplicants = async (applicationId: number) => {
    const response = await rejectApplicants(null, applicationId, meetingId);
    if (response) {
      console.log(response);
      success(response.message || '모임 신청을 거절했어요.');
    } else {
      error(response.message || '모임 신청을 거절하지 못했어요.');
    }
  };

  return (
    <>
      {isAuthor && (
        <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
          {participants.length === 0 ? (
            <div className="text-text-sub2 flex min-h-[143px] items-center justify-center">
              <p>아직 참여 신청한 사람이 없어요 .. !</p>
            </div>
          ) : (
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

                {/* 참여자 신청 대기 상태 */}
                {participant.status === 'APPLIED' && (
                  <div className="flex gap-2">
                    <Button
                      label="수락"
                      className="text-primary border-primary"
                      size="small"
                      onClick={() =>
                        handleApproveApplicants(participant.participantId)
                      }
                    />
                    <Button
                      label="거절"
                      className="border-text-sub1 text-text-sub1"
                      size="small"
                      onClick={() =>
                        handleRejectApplicants(participant.participantId)
                      }
                    />
                  </div>
                )}

                {/* 참여자 수락 상태 */}
                {participant.status === 'APPROVED' && (
                  <div className="flex items-center gap-2">
                    <div className="text-text-sub2 text-sm">
                      수락된 참여자에요.
                    </div>
                    <Button
                      label="강퇴"
                      className="text-primary border-primary"
                      size="small"
                      onClick={() =>
                        handleKickApplicants(participant.participantId)
                      }
                    />
                  </div>
                )}

                {/* 참여자 강퇴 상태 */}
                {participant.status === 'KICKED' && (
                  <div className="text-text-sub2 text-sm">
                    강퇴된 참여자에요.
                  </div>
                )}

                {/* 참여자 거절 상태 */}
                {participant.status === 'REJECTED' && (
                  <div className="text-text-sub2 text-sm">
                    거절된 참여자에요.
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};
