import { Button } from '@/components/Atoms';
import { ApplicantsMemberType } from '@/types/applicantsType';

type ParticipantStatus = ApplicantsMemberType['data']['status'];

interface ParticipantStatusActionsProps {
  status: ParticipantStatus;
  participantId: number;
  onApprove?: (id: number) => void;
  onKick?: (id: number) => void;
  onReject?: (id: number) => void;
  isReadOnly?: boolean;
}

// 상태별 UI 설정을 객체로 관리
const STATUS_CONFIG: Record<
  ParticipantStatus,
  {
    label: string;
    labelClassName: string;
  }
> = {
  APPROVED: {
    label: '참여 확정',
    labelClassName: 'text-primary',
  },
  APPLIED: {
    label: '신청 대기',
    labelClassName: 'text-text-sub2',
  },
  KICKED: {
    label: '강퇴된 참여자',
    labelClassName: 'text-text-sub2',
  },
  REJECTED: {
    label: '거절된 참여자',
    labelClassName: 'text-text-sub2',
  },
};

export const ParticipantStatusActions = ({
  status,
  participantId,
  onApprove,
  onKick,
  onReject,
  isReadOnly = false,
}: ParticipantStatusActionsProps) => {
  const config = STATUS_CONFIG[status];

  // 읽기 전용 모드 (완료/종료된 모임)
  if (isReadOnly) {
    return (
      <div className="flex items-center gap-2.5">
        <div className={`text-sm font-semibold ${config.labelClassName}`}>
          {config.label}
        </div>
      </div>
    );
  }

  // APPROVED 상태 - 참여 확정 + 강퇴 버튼
  if (status === 'APPROVED') {
    return (
      <div className="flex items-center gap-2.5">
        <div className={`text-sm font-semibold ${config.labelClassName}`}>
          {config.label}
        </div>
        <Button
          label="강퇴"
          aria-label="강퇴 버튼"
          size="small"
          className="!border-text-sub2 !text-text-sub2"
          variant="outline"
          onClick={() => onKick?.(participantId)}
        />
      </div>
    );
  }

  // APPLIED 상태 - 수락/거절 버튼
  if (status === 'APPLIED') {
    return (
      <div className="flex gap-2">
        <Button
          label="수락"
          aria-label="수락 버튼"
          size="small"
          variant="outline"
          onClick={() => onApprove?.(participantId)}
        />
        <Button
          label="거절"
          aria-label="거절 버튼"
          className="!border-text-sub2 !text-text-sub2"
          variant="outline"
          size="small"
          onClick={() => onReject?.(participantId)}
        />
      </div>
    );
  }

  // KICKED, REJECTED 상태 - 텍스트만 표시
  return (
    <div className={`text-sm font-semibold ${config.labelClassName}`}>
      {config.label}
    </div>
  );
};
