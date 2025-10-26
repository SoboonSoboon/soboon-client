import React from 'react';
import { cn } from '@/utils/cn';

export interface KeywordChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'active' | 'inactive';
  label?: string;
  children?: React.ReactNode;
}

export const KeywordChip = ({
  type = 'button',
  disabled,
  onClick,
  variant = 'inactive',
  className,
  label,
  children,
  ...props
}: KeywordChipProps) => {
  const baseStyles =
    'text-text-main py-2 px-4 cursor-pointer rounded-lg text-sm font-medium';

  const variants = {
    active: 'bg-Green-10',
    inactive: 'bg-gray-5',
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
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children || label}
    </button>
  );
};
