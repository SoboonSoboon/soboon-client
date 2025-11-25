'use client';

import { ApplicantsMemberType } from '@/types/applicantsType';
import { StatusString } from '@/types/common';
import { useParams } from 'next/navigation';
import { ParticipantItem } from './components';
import { useApplicants } from './hooks/useApplicants';

interface ApplicantsListProps {
  isAuthor: boolean;
  participants: ApplicantsMemberType['data'][];
  status: StatusString;
}

// 뷰 타입 정의
type ViewType =
  | 'author_active' // 작성자 + 진행중인 모임
  | 'author_closed' // 작성자 + 완료/종료된 모임
  | 'participant_approved_closed' // 신청자 + 승인됨 + 완료/종료
  | 'participant_not_approved_closed'; // 신청자 + 미승인 + 완료/종료

// 뷰 타입 결정 함수
const getViewType = (
  isAuthor: boolean,
  isCompletedOrClosed: boolean,
  isApproved: boolean,
): ViewType => {
  if (isAuthor && isCompletedOrClosed) return 'author_closed';
  if (isAuthor) return 'author_active';
  if (isCompletedOrClosed && isApproved) return 'participant_approved_closed';
  return 'participant_not_approved_closed';
};

// 빈 상태 메시지 컴포넌트
const EmptyState = ({ message }: { message: React.ReactNode }) => (
  <div className="text-text-sub2 flex min-h-[143px] items-center justify-center">
    {typeof message === 'string' ? <p>{message}</p> : message}
  </div>
);

// 참여자 목록 래퍼 컴포넌트
const ParticipantListWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
    {children}
  </div>
);

export const ApplicantsList = ({
  isAuthor,
  participants,
  status,
}: ApplicantsListProps) => {
  const { id: meetingId } = useParams<{ id: string }>();

  const {
    isCompletedOrClosed,
    myApplyStatus,
    filteredParticipants,
    handleApprove,
    handleKick,
    handleReject,
  } = useApplicants({ meetingId, status });

  const isApproved = myApplyStatus?.participationStatus === 'APPROVED';
  const viewType = getViewType(isAuthor, isCompletedOrClosed, isApproved);

  // 뷰 타입별 렌더링 로직을 객체로 관리
  const viewRenderers: Record<ViewType, () => React.ReactNode> = {
    // 작성자 + 진행중인 모임: 모든 신청자 표시 (액션 버튼 포함)
    author_active: () => (
      <ParticipantListWrapper>
        {participants.length === 0 ? (
          <EmptyState message="아직 참여 신청한 사람이 없어요 ... !" />
        ) : (
          participants.map((participant) => (
            <ParticipantItem
              key={participant.participantId}
              participant={participant}
              onApprove={handleApprove}
              onKick={handleKick}
              onReject={handleReject}
            />
          ))
        )}
      </ParticipantListWrapper>
    ),

    // 작성자 + 완료/종료된 모임: 확정된 참여자만 표시 (읽기 전용)
    author_closed: () => (
      <ParticipantListWrapper>
        {filteredParticipants?.map((participant) => (
          <ParticipantItem
            key={participant.participantId}
            participant={participant}
            isReadOnly
          />
        ))}
      </ParticipantListWrapper>
    ),

    // 신청자 + 승인됨 + 완료/종료: 확정된 참여자 목록 표시
    participant_approved_closed: () => (
      <ParticipantListWrapper>
        {filteredParticipants?.map((participant) => (
          <ParticipantItem
            key={participant.participantId}
            participant={participant}
            isReadOnly
          />
        ))}
      </ParticipantListWrapper>
    ),

    // 신청자 + 미승인 + 완료/종료: 접근 불가 메시지
    participant_not_approved_closed: () => {
      if (!isCompletedOrClosed) {
        return null;
      }

      return (
        <ParticipantListWrapper>
          <EmptyState
            message={
              <div>
                <p>모집이 종료되었어요.</p>
                <p>참여가 확정된 사람만 볼 수 있어요.</p>
              </div>
            }
          />
        </ParticipantListWrapper>
      );
    },
  };

  return <>{viewRenderers[viewType]()}</>;
};
