'use client';

import dynamic from 'next/dynamic';
import { MeetingDetailType } from '@/types/meetingsType';
import { ApplicantsMemberType } from '@/types/applicantsType';

const DynamicDetailAside = dynamic(
  () =>
    import('@/components/marketplace/DetailAside/DetailAside').then(
      (mod) => mod.DetailAside,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-8 rounded bg-gray-200"></div>
        <div className="h-24 rounded bg-gray-200"></div>
        <div className="h-32 rounded bg-gray-200"></div>
      </div>
    ),
  },
);

interface DynamicDetailAsideWrapperProps {
  meetingDetail: MeetingDetailType;
  isAuthor: boolean;
  participants: ApplicantsMemberType['data'][];
}

export function DynamicDetailAsideWrapper({
  meetingDetail,
  isAuthor,
  participants,
}: DynamicDetailAsideWrapperProps) {
  return (
    <DynamicDetailAside
      meetingDetail={meetingDetail}
      isAuthor={isAuthor}
      participants={participants}
    />
  );
}

