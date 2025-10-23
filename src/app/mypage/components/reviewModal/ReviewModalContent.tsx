import { ProfileImg } from '@/components';
import { ReviewKeyword } from '@/types/common';

interface ReviewModalContentProps {
  targetUser: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
  availableKeywords: ReviewKeyword[];
  selectedKeywords: ReviewKeyword[];
  onKeywordToggle: (keyword: ReviewKeyword) => void;
}

const REVIEW_KEYWORDS: Record<ReviewKeyword, string> = {
  TIME_PROMISE: '시간 약속을 잘 지켜요',
  KIND_AND_CARING: '친절하고 배려가 넘쳐요',
  SAME_AS_PHOTO: '사진과 동일해요',
  FAST_RESPONSE: '응답이 빨라요',
  GOOD_DISTRIBUTION: '적절하게 잘 분배했어요',
};

export const ReviewModalContent = ({
  targetUser,
  availableKeywords,
  selectedKeywords,
  onKeywordToggle,
}: ReviewModalContentProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <ProfileImg
          profileImageUrl={targetUser.profileImageUrl}
          size={44}
          className="rounded-full"
        />
        <span className="font-memomentKkukkkuk text-xl font-semibold">
          {targetUser.nickname}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {availableKeywords.map((keyword) => (
          <button
            key={keyword}
            onClick={() => onKeywordToggle(keyword)}
            className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${
              selectedKeywords.includes(keyword)
                ? 'bg-Green-10 border-primary'
                : 'hover:bg-Green-10 bg-custom-gray-1'
            }`}
          >
            {REVIEW_KEYWORDS[keyword]}
          </button>
        ))}
      </div>
    </div>
  );
};
