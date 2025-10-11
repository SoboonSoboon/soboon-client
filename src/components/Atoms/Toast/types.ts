export interface ToastType {
  id: string;
  title?: string;
  description?: string;
  option?: 'default' | 'error' | 'success' | 'warning' | 'info';
  duration?: number;
}
