import { MeetingItem } from '@/app/(main)/mypage/utils/mypageType';
import { MeetingDividingCard } from './Card/MeetingDividingCard';
import { MeetingShoppingCard } from './Card/MeetingShoppingCard';

export interface CardListProps {
  data: MeetingItem[];
  activeMainTab: 'host' | 'participate' | 'bookmark';
}
export const CardList = ({ data, activeMainTab }: CardListProps) => {
  return (
    <div className="h-full">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
        {data.map((meeting) =>
          meeting.category === 'DIVIDING' ? (
            <MeetingDividingCard
              key={meeting.groupId}
              meeting={meeting}
              activeMainTab={activeMainTab}
            />
          ) : (
            <MeetingShoppingCard
              key={meeting.groupId}
              meeting={meeting}
              activeMainTab={activeMainTab}
            />
          ),
        )}
      </div>
    </div>
  );
};
