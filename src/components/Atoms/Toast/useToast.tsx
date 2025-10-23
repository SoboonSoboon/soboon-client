'use client';

import { useToast as useToastContext } from './ToastContext';

export const useToast = () => {
  const { addToast, removeToast } = useToastContext()!;

  return {
    toast: (description?: string) =>
      addToast({ description, option: 'default' }),

    success: (description?: string) =>
      addToast({ description, option: 'success' }),

    error: (description?: string) => addToast({ description, option: 'error' }),

    warning: (description?: string) =>
      addToast({ description, option: 'warning' }),

    info: (description?: string) => addToast({ description, option: 'info' }),

    remove: removeToast,
  };
};
