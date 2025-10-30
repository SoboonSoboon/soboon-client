'use client';

import { MYPAGE_TAB_LABELS } from '@/constants';
import { type MainTabType } from '@/app/(main)/mypage/utils/mypageType';

interface MainTabSectionProps {
  activeMainTab: MainTabType;
  onMainTabChange: (tab: MainTabType) => void;
}

export const MainTabSection = ({
  activeMainTab,
  onMainTabChange,
}: MainTabSectionProps) => {
  return (
    <div className="border-text-line2 border-b">
      <div className="flex gap-2 sm:gap-2.5">
        {MYPAGE_TAB_LABELS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => (
              onMainTabChange(tab.value as MainTabType),
              console.log(tab.value)
            )}
            className={`font-memomentKkukkkuk relative text-base transition-colors sm:text-lg ${
              activeMainTab === tab.value
                ? 'text-quaternary'
                : 'text-text-sub2 cursor-pointer'
            }`}
          >
            {tab.label}
            {activeMainTab === tab.value && (
              <div className="bg-quaternary absolute right-0 bottom-[-1px] left-0 h-[1px]"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
