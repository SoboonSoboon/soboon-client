import { Button, ProfileImg } from '@/components';
import { Modal } from '@/components/Molecules/modal';
import { ReviewKeyword } from '@/types/common';
import { useState } from 'react';

interface ReviewModal {
  modal: {
    isOpen: boolean;
    close: () => void;
  };
  meetingId: number;
  targetUser: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
  category: 'DIVIDING' | 'SHOPPING';
}
const REVIEW_KEYWORDS: Record<ReviewKeyword, string> = {
  TIME_PROMISE: '시간 약속을 잘 지켜요',
  KIND_AND_CARING: '친절하고 배려가 넘쳐요',
  SAME_AS_PHOTO: '사진과 동일해요',
  FAST_RESPONSE: '응답이 빨라요',
  GOOD_DISTRIBUTION: '적절하게 잘 분배했어요',
};
export const ReviewModal = ({
  modal,
  meetingId,
  targetUser,
  category,
}: ReviewModal) => {
  const [selectedKeywords, setSelectedKeywords] = useState<ReviewKeyword[]>([]);
  const getAvailableKeywords = (): ReviewKeyword[] => {
    const baseKeywords: ReviewKeyword[] = [
      'TIME_PROMISE',
      'KIND_AND_CARING',
      'FAST_RESPONSE',
    ];

    if (category === 'DIVIDING') {
      return [...baseKeywords, 'SAME_AS_PHOTO'];
    } else {
      return [...baseKeywords, 'GOOD_DISTRIBUTION'];
    }
  };
  const availableKeywords = getAvailableKeywords();

  const handleKeywordToggle = (keyword: ReviewKeyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((data) => data !== keyword)
        : [...prev, keyword],
    );
  };
  const handleSubmit = () => {
    console.log('submit', {
      eventId: meetingId,
      userId: targetUser.userId,
      selectedReviews: selectedKeywords,
    });
    modal.close();
  };
  return (
    <Modal isOpen={modal.isOpen} onClose={modal.close} className="z-50">
      <div className="w-full max-w-md rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <ProfileImg
              profileImageUrl={targetUser.profileImageUrl}
              size={60}
              className="rounded-full"
            />
            <span className="font-memomentKkukkkuk text-xl font-semibold">
              {targetUser.nickname}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-3">
          <h3 className="text-gray-70 mb-3 text-sm font-semibold">
            키워드 선택
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {availableKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleKeywordToggle(keyword)}
                className={`cursor-pointer rounded-lg border p-3 text-sm transition-colors ${
                  selectedKeywords.includes(keyword)
                    ? 'bg-primary border-primary text-white'
                    : 'hover:border-primary text-gray-80 border-gray-30 bg-white'
                }`}
              >
                {REVIEW_KEYWORDS[keyword]}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6">
            <Button
              label="닫기"
              className="hover:bg-gray-30 flex-1 !py-3"
              onClick={() => modal.close()}
            />
            <Button
              variant="outline"
              label={'확정'}
              className="flex-1 !py-3"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
