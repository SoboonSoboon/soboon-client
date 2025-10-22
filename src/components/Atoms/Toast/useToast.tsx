'use client';

import { useToast as useToastContext } from './ToastContext';

export const useToast = () => {
  const { addToast, removeToast } = useToastContext()!;

  return {
    toast: (title: string, description?: string) =>
      addToast({ title, description, option: 'default' }),

    success: (title: string, description?: string) =>
      addToast({ title, description, option: 'success' }),

    error: (title: string, description?: string) =>
      addToast({ title, description, option: 'error' }),

    warning: (title: string, description?: string) =>
      addToast({ title, description, option: 'warning' }),

    info: (title: string, description?: string) =>
      addToast({ title, description, option: 'info' }),

    remove: removeToast,
  };
};
