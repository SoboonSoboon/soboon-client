'use client';

// 탭 타입 정의
export type MainTabType = 'created' | 'participated' | 'liked';
export type SubTabType = 'DIVIDING' | 'SHOPPING';

interface TabSectionProps {
  activeMainTab: MainTabType;
  activeSubTab: SubTabType;
  onMainTabChange: (tab: MainTabType) => void;
  onSubTabChange: (tab: SubTabType) => void;
}

// 탭 섹션 컴포넌트
export const TabSection = ({
  activeMainTab,
  activeSubTab,
  onMainTabChange,
  onSubTabChange,
}: TabSectionProps) => {
  const mainTabs = [
    { key: 'created' as MainTabType, label: '내가 만든 모임' },
    { key: 'participated' as MainTabType, label: '나의 모임' },
    { key: 'liked' as MainTabType, label: '찜한 모임' },
  ];

  const subTabs = [
    { key: 'SHOPPING' as SubTabType, label: '장보기' },
    { key: 'DIVIDING' as SubTabType, label: '소분하기' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 메인 탭 */}
      <div className="border-text-line2 border-b">
        <div className="flex gap-2.5">
          {mainTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => (onMainTabChange(tab.key), console.log(tab.key))}
              className={`relative pb-3 text-sm font-medium transition-colors ${
                activeMainTab === tab.key
                  ? 'text-quaternary'
                  : 'text-text-sub2 cursor-pointer'
              }`}
            >
              {tab.label}

              {activeMainTab === tab.key && (
                <div className="bg-quaternary absolute right-0 bottom-[-1px] left-0 h-[1px]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 서브 탭 */}

      <div className="flex gap-6">
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onSubTabChange(tab.key)}
            className={`h-9 w-auto rounded-lg border px-4 text-sm font-medium transition-colors ${
              activeSubTab === tab.key
                ? 'border-quaternary bg-white'
                : 'bg-gray-5 cursor-pointer border-none'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
