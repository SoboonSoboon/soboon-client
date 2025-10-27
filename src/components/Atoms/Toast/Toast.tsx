import type { ToastType } from './types';
import { AlertTriangle, Check, Info, X } from 'lucide-react';

interface ToastProps {
  toast: ToastType;
  remove: (id: string) => void;
}

const icons = {
  default: (
    <>
      <div className="flex size-6 items-center justify-center rounded-full bg-[#46C470]">
        <Check className="size-3.5 text-white" strokeWidth={4} />
      </div>
    </>
  ),
  error: (
    <>
      <div className="flex size-6 items-center justify-center rounded-full bg-[#FF4040]">
        <X className="size-3.5 text-white" strokeWidth={4} />
      </div>
    </>
  ),
  success: (
    <>
      <div className="flex size-6 items-center justify-center rounded-full bg-[#46C470]">
        <Check className="size-3.5 text-white" strokeWidth={4} />
      </div>
    </>
  ),
  warning: (
    <>
      <div className="flex size-6 items-center justify-center rounded-full bg-[#FFB800]">
        <AlertTriangle className="size-3.5 text-white" strokeWidth={3} />
      </div>
    </>
  ),
  info: (
    <>
      <div className="flex size-6 items-center justify-center rounded-full bg-[#007AFF]">
        <Info className="size-3.5 text-white" strokeWidth={3} />
      </div>
    </>
  ),
};

export const Toast = ({ toast }: ToastProps) => {
  return (
    <div
      className={`flex flex-col gap-2 rounded border bg-black px-4 py-2 shadow`}
    >
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          {icons[toast.option || 'default']}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <p className="text-sm whitespace-nowrap text-white">
            {toast.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ToastContainer = ({
  toasts,
  removeToast,
}: {
  toasts: ToastType[];
  removeToast: (id: string) => void;
}) => {
  return (
    <div className="fixed right-1/2 bottom-0 z-[100] flex max-h-screen translate-x-1/2 p-4">
      <div className="flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} remove={removeToast} />
        ))}
      </div>
    </div>
  );
};
