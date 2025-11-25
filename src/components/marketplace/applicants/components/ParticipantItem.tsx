import { ProfileImg } from '@/components/Atoms';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { ParticipantStatusActions } from './ParticipantStatusActions';

interface ParticipantItemProps {
  participant: ApplicantsMemberType['data'];
  onApprove?: (id: number) => void;
  onKick?: (id: number) => void;
  onReject?: (id: number) => void;
  isReadOnly?: boolean;
}

export const ParticipantItem = ({
  participant,
  onApprove,
  onKick,
  onReject,
  isReadOnly = false,
}: ParticipantItemProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2 py-2">
        <ProfileImg profileImageUrl={participant.profileImageUrl} size={32} />
        <p>{participant.userNickname}</p>
      </div>

      <ParticipantStatusActions
        status={participant.status}
        participantId={participant.participantId}
        onApprove={onApprove}
        onKick={onKick}
        onReject={onReject}
        isReadOnly={isReadOnly}
      />
    </div>
  );
};
