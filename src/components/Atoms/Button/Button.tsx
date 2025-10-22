import React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline';
  size?: 'small' | 'large';
  label?: string;
  children?: React.ReactNode;
}

export const Button = ({
  type = 'button',
  disabled,
  onClick,
  size = 'large',
  variant = 'filled',
  className,
  label,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg border font-medium select-none transition h-11';

  const sizes = {
    small: 'h-10 px-4 text-sm', // 모바일 사이즈
    large: 'h-11 px-5 text-base', // 데스크탑 사이즈
  } as const;

  const variants = {
    filled:
      'cursor-pointer bg-primary text-white border-transparent hover:bg-[var(--GreenScale-Green60)] active:bg-[var(--GreenScale-Green70)]',
    outline:
      'cursor-pointer bg-white text-primary border-primary active:border-[var(--GreenScale-Green70)] active:text-[var(--GreenScale-Green70)]',
  } as const;

  const disabledVariants = {
    filled:
      'bg-[var(--GrayScale-Gray30)] text-white border-transparent cursor-not-allowed font-normal',
    outline:
      'bg-white text-[var(--GrayScale-Gray30)] border-[var(--GrayScale-Gray40)] cursor-not-allowed font-normal',
  } as const;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        baseStyles,
        sizes[size],
        disabled ? disabledVariants[variant] : variants[variant],
        className,
      )}
      {...props}
    >
      {children || label}
    </button>
  );
};
