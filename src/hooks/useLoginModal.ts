'use client';

import { useModal } from '@/components/Molecules';
import { redirectToKakao } from '@/apis';

export const useLoginModal = () => {
  const modal = useModal();

  const openLoginModal = () => {
    modal.open();
  };

  const closeLoginModal = () => {
    modal.close();
  };

  const handleLogin = () => {
    redirectToKakao();
    modal.close();
  };

  return {
    isOpen: modal.isOpen,
    openLoginModal,
    closeLoginModal,
    handleLogin,
  };
};
