import { MeetingCard } from './MeetingCard';
import { meetingItem } from './mock';
export interface CardListProps {
  data: meetingItem[];
}
export const CardList = ({ data }: CardListProps) => {
  return (
    <div className="h-full">
      <div className="flex flex-wrap gap-8 gap-y-6">
        {data.map((meeting) => (
          <MeetingCard key={meeting.groupId} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};
