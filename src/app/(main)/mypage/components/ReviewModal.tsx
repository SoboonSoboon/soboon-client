import { useToast } from '@/components/Atoms';
import { Modal } from '@/components/Molecules';
import { ReviewModalContent } from './ReviewModalContent';
import { ReviewKeyword } from '@/types/common';
import { ReviewerListData } from '../utils/review';

interface ReviewModalProps {
  modal: {
    isOpen: boolean;
    close: () => void;
  };
  reviewTargetList: ReviewerListData[];
  handleReviewSubmit: (
    targetUserId: number,
    selectedKeywords: ReviewKeyword[],
  ) => void;
  activeMainTab?: 'host' | 'participate' | 'bookmark';
  isLoading?: boolean;
  error?: Error | null;
}

export const ReviewModal = ({
  modal,
  reviewTargetList,
  handleReviewSubmit,
  activeMainTab = 'host',
  isLoading = false,
  error = null,
}: ReviewModalProps) => {
  const toast = useToast();

  // 에러 발생 시 Toast 표시하고 모달 닫기
  if (error) {
    toast.error('리뷰 목록을 불러오는데 실패했어요.');
    modal.close();
    return null;
  }

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={modal.close}
      className="z-40 md:items-center"
      size="custom"
      position="bottom"
      showCloseButton={true}
      contentClassName={`
        w-full max-w-none rounded-t-[24px] rounded-b-none p-6
        md:w-[520px] md:rounded-[24px] md:p-[52px]
        flex flex-col gap-8
        ${activeMainTab === 'participate' ? 'h-[420px]' : ' md:h-[677px] h-[520px]'}
       
      `}
      scrollable={true}
      maxHeight="90vh"
    >
      <div className="flex items-center justify-center">
        <div className="w-full text-center font-serif text-2xl font-bold">
          리뷰 작성
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">로딩중...</div>
        </div>
      ) : (
        <ReviewModalContent
          reviewTargetList={reviewTargetList}
          handleReviewSubmit={handleReviewSubmit}
          activeMainTab={activeMainTab}
        />
      )}
    </Modal>
  );
};
