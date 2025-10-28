'use client';

import { cn } from '@/utils/cn';
// import { useClickOutside } from '@/hooks/useClickOutside';

export type ActionMenuVariant = 'default' | 'danger';

export interface ActionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
  menuOptions: {
    id: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
    variant?: ActionMenuVariant;
  }[];
}

export const ActionMenu = ({
  className,
  onClose,
  buttonRef,
  menuOptions,
  ...props
}: ActionMenuProps) => {
  // const menuRef = useClickOutside(onClose as () => void, buttonRef);

  return (
    <>
      <div
        // ref={menuRef}
        className={cn(
          'border-gray-10 flex w-35 flex-col rounded-lg border-1 bg-white shadow-[0_0_6px_rgba(0,0,0,0.15)]',
          className,
        )}
        {...props}
      >
        <ul className="flex flex-col">
          {menuOptions.map((menu) => (
            <li
              key={menu.id}
              onClick={(e) => {
                console.log('메뉴 아이템 클릭됨:', menu.id, menu.label);
                e.stopPropagation();
                menu.onClick(e);
              }}
              aria-label={menu.label}
              className={cn(
                'border-gray-10 flex cursor-pointer items-center justify-center border-b px-4 py-2.5 transition-all duration-200 hover:rounded-t-lg',
                menu.variant === 'danger' ? 'text-warning' : 'text-text-main',
              )}
            >
              <span>{menu.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
