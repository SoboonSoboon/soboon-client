'use client';

import { MainTabSection } from './MainTabSection';
import { SubTabSection } from './SubTabSection';
import { ReviewToggleButton } from './ReviewToggleButton';
import {
  type MainTabType,
  type SubTabType,
} from '@/app/(main)/mypage/utils/mypageType';

interface MypageHeaderProps {
  activeMainTab: MainTabType;
  activeSubTab: SubTabType;
  onMainTabChange: (tab: MainTabType) => void;
  onSubTabChange: (tab: SubTabType) => void;
  hideCompletedReviews: boolean;
  onToggleHideCompletedReviews: (checked: boolean) => void;
}

export const MypageHeader = ({
  activeMainTab,
  activeSubTab,
  onMainTabChange,
  onSubTabChange,
  hideCompletedReviews,
  onToggleHideCompletedReviews,
}: MypageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* 메인 탭 */}
      <MainTabSection
        activeMainTab={activeMainTab}
        onMainTabChange={onMainTabChange}
      />

      {/* 서브 탭과 리뷰 완료 숨기기 토글 */}
      <div className="flex items-center justify-between">
        <SubTabSection
          activeSubTab={activeSubTab}
          onSubTabChange={onSubTabChange}
        />

        <ReviewToggleButton
          isChecked={hideCompletedReviews}
          onChange={onToggleHideCompletedReviews}
        />
      </div>
    </div>
  );
};
