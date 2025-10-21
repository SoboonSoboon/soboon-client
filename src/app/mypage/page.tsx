'use client';

import { useState, useEffect } from 'react';
import {
  TabSection,
  MainTabType,
  SubTabType,
  CardList,
} from '@/app/mypage/components';
import {
  MeetingData,
  hostMeetingsData,
  participatedMeetingsData,
  likedMeetingsData,
} from './components/mock';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeMainTab, setActiveMainTab] = useState<MainTabType>(
    (searchParams.get('main') as MainTabType) || 'created',
  );
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>(
    (searchParams.get('sub')?.toUpperCase() as SubTabType) || 'SHOPPING',
  );
  const [meetings, setMeetings] = useState<MeetingData[]>([]);

  const handleMainTabChange = (tab: MainTabType) => {
    setActiveMainTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('main', tab);
    router.push(`/mypage?${params.toString()}`);
  };

  const handleSubTabChange = (tab: SubTabType) => {
    setActiveSubTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sub', tab.toLowerCase());
    router.push(`/mypage?${params.toString()}`);
  };

  useEffect(() => {
    let filteredMeetings: MeetingData[] = [];

    // 1. 메인탭에 따라 전체 데이터 선택
    let allMeetings: MeetingData[] = [];
    if (activeMainTab === 'created') {
      allMeetings = hostMeetingsData.data.items;
    } else if (activeMainTab === 'participated') {
      allMeetings = participatedMeetingsData.data.items;
    } else if (activeMainTab === 'bookmarked') {
      allMeetings = likedMeetingsData.data.items;
    }

    // 2. 서브탭에 따라 category 필터링
    filteredMeetings = allMeetings.filter(
      (meeting) => meeting.category === activeSubTab,
    );

    setMeetings(filteredMeetings);
  }, [activeMainTab, activeSubTab]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-1 flex-col bg-white">
        <TabSection
          activeMainTab={activeMainTab}
          activeSubTab={activeSubTab}
          onMainTabChange={handleMainTabChange}
          onSubTabChange={handleSubTabChange}
        />

        <div className="flex-1 pt-6">
          <CardList meetings={meetings} />
        </div>
      </div>
    </div>
  );
}
