import { MeetingItem } from '../utils/mypageType';
import { MeetingCard } from './MeetingCard';

export interface CardListProps {
  data: MeetingItem[];
  activeMainTab: string;
}
export const CardList = ({ data, activeMainTab }: CardListProps) => {
  return (
    <div className="h-full">
      <div className="flex flex-wrap gap-8 gap-y-6">
        {data.map((meeting) => (
          <MeetingCard
            key={meeting.groupId}
            meeting={meeting}
            activeMainTab={activeMainTab}
          />
        ))}
      </div>
    </div>
  );
};
