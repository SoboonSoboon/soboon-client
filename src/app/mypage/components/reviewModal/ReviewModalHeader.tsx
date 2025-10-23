interface ReviewModalHeaderProps {
  activeMainTab: string;
  currentStepIndex: number;
}

export const ReviewModalHeader = ({
  activeMainTab,
  currentStepIndex,
}: ReviewModalHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="w-[150px] rounded-full">
        {activeMainTab === 'host' ? (
          // host 탭: 3개로 나눠진 막대 (개별 막대들)
          <div className="flex gap-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index <= currentStepIndex ? 'bg-Green-50' : 'bg-gray-10'
                }`}
              />
            ))}
          </div>
        ) : (
          // participant 탭: 하나의 막대 (3개 막대 중 하나와 동일한 크기)
          <div className="bg-Green-50 h-1 w-[44px] rounded-full" />
        )}
      </div>
      <div className="w-full text-center font-serif text-2xl font-bold">
        리뷰 작성
      </div>
    </div>
  );
};
