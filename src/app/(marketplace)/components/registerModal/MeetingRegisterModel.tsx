'use client';

import { useState, useEffect } from 'react';
import { ShoppingRegisterForm } from './ShoppingRegisterForm';
import { SharingRegisterForm } from './SharingRegisterForm';

export function ShoppingMeetingRegisterModel({
  isOpen,
  meetingType,
  onClose,
}: {
  isOpen: boolean;
  meetingType: 'shopping' | 'sharing';
  onClose: () => void;
}) {
  const [isOpenModel, setIsOpenModel] = useState(isOpen);

  // isOpen prop이 변경될 때 내부 상태 동기화
  useEffect(() => {
    setIsOpenModel(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpenModel(false);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.3)] p-6 ${isOpenModel ? 'block' : 'hidden'}`}
        onClick={handleClose}
      ></div>
      <dialog
        className="fixed top-1/2 left-1/2 z-50 w-[472px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
        open={isOpenModel}
      >
        {meetingType === 'shopping' && (
          <ShoppingRegisterForm handleClose={handleClose} />
        )}
        {meetingType === 'sharing' && (
          <SharingRegisterForm handleClose={handleClose} />
        )}
      </dialog>
    </>
  );
}
