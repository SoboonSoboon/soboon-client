'use client';

import { MYPAGE_TAB_LABELS, MYPAGE_SUB_TAB_LABELS } from '@/constants';

export type MainTabType = 'created' | 'participated' | 'bookmarked';
export type SubTabType = 'SHOPPING' | 'DIVIDING';

interface TabSectionProps {
  activeMainTab: MainTabType;
  activeSubTab: SubTabType;
  onMainTabChange: (tab: MainTabType) => void;
  onSubTabChange: (tab: SubTabType) => void;
}

export const TabSection = ({
  activeMainTab,
  activeSubTab,
  onMainTabChange,
  onSubTabChange,
}: TabSectionProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* 메인 탭 */}
      <div className="border-text-line2 border-b">
        <div className="flex gap-2.5">
          {MYPAGE_TAB_LABELS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => (
                onMainTabChange(tab.id as MainTabType),
                console.log(tab.id)
              )}
              className={`font-memomentKkukkkuk relative transition-colors ${
                activeMainTab === tab.id
                  ? 'text-quaternary'
                  : 'text-text-sub2 cursor-pointer'
              }`}
            >
              {tab.name}
              {activeMainTab === tab.id && (
                <div className="bg-quaternary absolute right-0 bottom-[-1px] left-0 h-[1px]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 서브 탭 */}
      <div className="flex gap-2.5">
        {MYPAGE_SUB_TAB_LABELS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSubTabChange(tab.id as SubTabType)}
            className={`h-9 w-auto rounded-lg border px-4 text-sm font-medium transition-colors ${
              activeSubTab === tab.id
                ? 'bg-gray-70 text-white'
                : 'bg-gray-5 cursor-pointer border-none'
            }`}
            disabled={activeSubTab === tab.id}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};
