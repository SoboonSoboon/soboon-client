import { timeFormatter } from '@/utils';
import { MeetingItem } from '../../../utils/mypageType';

interface MeetingCardInfoProps {
  meeting: MeetingItem;
  participantCount: number;
}

// 카드 정보 (작성자, 시간, 참여자 수)
export const MeetingCardInfo = ({
  meeting,
  participantCount,
}: MeetingCardInfoProps) => {
  return (
    <div className="flex w-full items-center justify-between text-sm">
      <p className="text-text-sub2 flex items-center gap-1">
        <span>{meeting.hostName}</span>
        <span>・</span>
        <time dateTime={meeting.createdAt}>
          {timeFormatter(meeting.createdAt)}
        </time>
      </p>
      <span id="참여자인원수" className="text-text-sub2">
        참여자 {participantCount}명
      </span>
    </div>
  );
};
