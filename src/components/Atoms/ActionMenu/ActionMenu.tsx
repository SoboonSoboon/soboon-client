'use client';

import { cn } from '@/utils/cn';
import { useClickOutside } from '@/hooks/useClickOutside';
import React from 'react';

export interface ActionMenuItem {
  id: string;
  label: string;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

export interface ActionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
  items: ActionMenuItem[];
}

export const ActionMenu = ({
  className,
  onClose,
  buttonRef,
  items,
  ...props
}: ActionMenuProps) => {
  const handleOutsideClose = () => {
    onClose?.();
  };

  const menuRef = useClickOutside(handleOutsideClose, buttonRef);

  return (
    <div
      ref={menuRef}
      className={cn(
        'border-gray-10 mt-2.5 flex w-35 flex-col rounded-xl border bg-white shadow-[0_0_6px_rgba(0,0,0,0.15)]',
        className,
      )}
      {...props}
    >
      <ul className="text-gray-90 flex flex-col">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              'flex cursor-pointer items-center justify-center px-4 py-2.5 transition-all duration-200 hover:bg-green-50',
              item.disabled && 'cursor-not-allowed opacity-50',
              item.variant === 'danger' ? 'text-warning' : 'text-text-main',
              index === 0 &&
                'border-b border-[var(--GrayScale-Gray10)] hover:rounded-t-xl',
              index === items.length - 1 && 'hover:rounded-b-xl',
              index !== items.length - 1 &&
                index !== 0 &&
                'border-b border-[var(--GrayScale-Gray10)]',
            )}
            onClick={(e) => {
              if (!item.disabled) {
                item.onClick(e);
              }
            }}
          >
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
