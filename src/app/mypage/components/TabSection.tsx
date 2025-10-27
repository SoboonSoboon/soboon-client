'use client';

import { MYPAGE_TAB_LABELS, MYPAGE_SUB_TAB_LABELS } from '@/constants';
import { KeywordChip } from '@/components/Atoms';

export type MainTabType = 'host' | 'participate' | 'bookmark';
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
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* 메인 탭 */}
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

      {/* 서브 탭 */}
      <div className="flex gap-2 sm:gap-2.5">
        {MYPAGE_SUB_TAB_LABELS.map((tab) => (
          <KeywordChip
            key={tab.key}
            onClick={() => onSubTabChange(tab.value as SubTabType)}
            variant={activeSubTab === tab.value ? 'active' : 'inactive'}
            className="text-xs sm:text-sm"
          >
            {tab.label}
          </KeywordChip>
        ))}
      </div>
    </div>
  );
};
