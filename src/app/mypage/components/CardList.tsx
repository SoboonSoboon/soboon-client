import { MeetingCard } from './MeetingCard';
import { MeetingData } from './mock';

interface CardListProps {
  meetings: MeetingData[];
}

export const CardList = ({ meetings }: CardListProps) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-wrap gap-8 gap-y-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.groupId} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};
