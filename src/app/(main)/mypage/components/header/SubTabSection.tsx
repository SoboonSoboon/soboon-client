'use client';

import { MYPAGE_SUB_TAB_LABELS } from '@/constants';
import { KeywordChip } from '@/components/Atoms';
import { type SubTabType } from '@/app/(main)/mypage/utils/mypageType';

interface SubTabSectionProps {
  activeSubTab: SubTabType;
  onSubTabChange: (tab: SubTabType) => void;
}

export const SubTabSection = ({
  activeSubTab,
  onSubTabChange,
}: SubTabSectionProps) => {
  return (
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
  );
};
