'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ShoppingMeetingRegisterModal } from '../../../components/marketplace';
import { Button } from '@/components';

export const NonDividingList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-40">
        <div className="text-center">
          <h3 className="text-text-main mb-2 text-xl font-semibold">
            아직 소분하기 모임이 없어요
          </h3>
          <p className="text-text-sub2 mb-8 text-sm leading-relaxed">
            첫 번째 소분하기 모임을 만들어보세요!
            <br />
            함께 소분할 사람들을 찾아보세요.
          </p>

          <div className="flex flex-col gap-3">
            <Button onClick={() => handleOpen()} variant="filled">
              소분하기 모임 만들기
            </Button>

            <Button onClick={() => router.push('/shopping')} variant="outline">
              장보기 모임 둘러보기
            </Button>
          </div>
        </div>
      </div>
      <ShoppingMeetingRegisterModal
        meetingType="sharing"
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};
