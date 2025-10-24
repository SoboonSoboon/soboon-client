import { Modal } from '@/components/Molecules/modal';

import { TargetUserModalContent } from './TargetUserModalContent';
import { useToast } from '@/components/Atoms/Toast/useToast';
import { ReviewKeyword } from '@/types/common';
import { ReviewerListData } from '../../utils/review';

interface TargetUserModalProps {
  modal: {
    isOpen: boolean;
    close: () => void;
  };
  reviewTargetList: ReviewerListData[];
  handleReviewSubmit: (
    targetUserId: number,
    selectedKeywords: ReviewKeyword[],
  ) => void;
  activeMainTab?: 'host' | 'participate';
  isLoading?: boolean;
  error?: Error | null;
}

export const TargetUserModal = ({
  modal,
  reviewTargetList,
  handleReviewSubmit,
  activeMainTab = 'host',
  isLoading = false,
  error = null,
}: TargetUserModalProps) => {
  const toast = useToast();

  // 에러 발생 시 Toast 표시하고 모달 닫기
  if (error) {
    toast.error('리뷰 목록을 불러오는데 실패했습니다.');
    modal.close();
    return null;
  }

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={modal.close}
      className="z-50"
      size="custom"
      contentClassName={`w-[520px] rounded-[24px] p-[52px] flex flex-col gap-8 ${
        activeMainTab === 'participate' ? 'h-[420px]' : 'h-[677px]'
      }`}
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
        <TargetUserModalContent
          reviewTargetList={reviewTargetList}
          handleReviewSubmit={handleReviewSubmit}
          activeMainTab={activeMainTab}
        />
      )}
    </Modal>
  );
};
