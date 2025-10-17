'use client';

import { useState, useEffect } from 'react';
import { TabSection, MainTabType, SubTabType } from './components/TabSection';
import { CardList } from './components/CardList';
import {
  MeetingData,
  hostMeetingsData,
  participatedMeetingsData,
  likedMeetingsData,
} from './components/mock';

export default function MyPage() {
  const [activeMainTab, setActiveMainTab] = useState<MainTabType>('created');
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('DIVIDING');
  const [meetings, setMeetings] = useState<MeetingData[]>([]);

  useEffect(() => {
    let filteredMeetings: MeetingData[] = [];

    // 1. 메인탭에 따라 전체 데이터 선택
    let allMeetings: MeetingData[] = [];
    if (activeMainTab === 'created') {
      allMeetings = hostMeetingsData.data.items;
    } else if (activeMainTab === 'participated') {
      allMeetings = participatedMeetingsData.data.items;
    } else if (activeMainTab === 'liked') {
      allMeetings = likedMeetingsData.data.items;
    }

    // 2. 서브탭에 따라 category 필터링
    filteredMeetings = allMeetings.filter(
      (meeting) => meeting.category === activeSubTab,
    );

    setMeetings(filteredMeetings);
  }, [activeMainTab, activeSubTab]);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="flex h-screen flex-1 flex-col bg-white">
        <TabSection
          activeMainTab={activeMainTab}
          activeSubTab={activeSubTab}
          onMainTabChange={setActiveMainTab}
          onSubTabChange={setActiveSubTab}
        />

        <div className="flex-1 overflow-hidden pt-6">
          <CardList meetings={meetings} />
        </div>
      </div>
    </div>
  );
}
