'use client';

import { useState } from 'react';
import { DividingMeetingsType } from '@/types/meetingsType';
import { IntroSection } from '@/components/marketplace';
import {
  FilterSection,
  SharingListSection,
  SearchSection,
  FilterBottomSheet,
} from '@/app/(main)/sharing/components';
import { SideButtonSection } from '@/components';
import { Funnel } from 'lucide-react';

interface SharingPageContentProps {
  initialDividingList: DividingMeetingsType | null;
  query: URLSearchParams;
}

export default function SharingPageContent({
  initialDividingList,
  query,
}: SharingPageContentProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <main className="flex w-full flex-col gap-4 md:gap-8">
      <IntroSection
        src="/images/banner_dividing.png"
        alt="소분하기 배너"
        className="overflow-hidden rounded-lg"
        width={2400}
        height={500}
      />
      <div className="flex w-full items-center justify-between">
        <div className="md:hidden">
          <Funnel
            size={20}
            onClick={() => setIsFilterOpen(true)}
            className="border-gray-10 text-gray-95 mr-2.5 flex h-11 w-[47px] cursor-pointer items-center justify-center rounded-xl border bg-white px-3 font-medium"
          />
          <FilterBottomSheet
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>
        <div className="flex w-full justify-between gap-2.5 md:justify-end">
          <SearchSection />
        </div>
      </div>

      <section className="flex gap-10">
        <aside className="sticky top-6 hidden h-[95vh] w-[200px] md:block">
          <FilterSection />
        </aside>
        <div className="flex-1">
          <SharingListSection
            initialDividingList={initialDividingList}
            query={query}
          />
        </div>
      </section>
      <SideButtonSection />
    </main>
  );
}
