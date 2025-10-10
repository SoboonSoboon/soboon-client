import type { ToastType } from './types';
import { CheckIcon, XIcon, AlertTriangleIcon, InfoIcon, CloseIcon } from './icons';

interface ToastProps {
  toast: ToastType;
  remove: (id: string) => void;
}

const styles = {
  default: 'bg-white border-gray-200 text-gray-900',
  error: 'bg-red-50 border-red-200 text-red-900',
  success: 'bg-green-50 border-green-200 text-green-900',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  info: 'bg-blue-50 border-blue-200 text-blue-900',
};

const icons = {
  default: <CheckIcon className="h-4 w-4" />,
  error: <XIcon className="h-4 w-4" />,
  success: <CheckIcon className="h-4 w-4" />,
  warning: <AlertTriangleIcon className="h-4 w-4" />,
  info: <InfoIcon className="h-4 w-4" />,
};

export const Toast = ({ toast, remove }: ToastProps) => {
  return (
    <div
      className={`relative flex flex-col gap-2 rounded border p-3 shadow ${styles[toast.option || 'default']}`}
    >
      <div className="flex items-center">
        <div className="mr-4">{icons[toast.option || 'default']}</div>
        <div className="flex flex-col gap-1 text-left">
          <h3>{toast.title}</h3>
          <p className="text-sm">{toast.description}</p>
        </div>
      </div>
      <button onClick={() => remove(toast.id)} className="absolute top-3 right-3 cursor-pointer">
        <CloseIcon className="h-4 w-4" />
      </button>
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
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} remove={removeToast} />
      ))}
    </div>
  );
};
