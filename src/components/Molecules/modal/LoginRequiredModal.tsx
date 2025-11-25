'use client';

import { Button } from '@/components/Atoms';
import { Modal } from './modal';
import { MODAL_IS_LOGIN_REQUIRED_TEXT } from '@/constants';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginRequiredModal = ({
  isOpen,
  onClose,
  onLogin,
}: LoginRequiredModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div
        className="flex flex-col items-center p-7 pb-5"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h2 className="mb-2 text-[22px] font-semibold">
          {MODAL_IS_LOGIN_REQUIRED_TEXT.LOGIN_COMMENT_TITLE}
        </h2>
        <p className="text-text-main mb-8 text-center">
          {MODAL_IS_LOGIN_REQUIRED_TEXT.LOGIN_COMMENT_LIST}
        </p>
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
            label="취소"
            aria-label="취소 버튼"
          />
          <Button
            variant="filled"
            label="로그인"
            onClick={onLogin}
            className="w-full"
            aria-label="로그인 버튼"
          />
        </div>
      </div>
    </Modal>
  );
};
