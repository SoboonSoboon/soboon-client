'use client';

import { ActionMenu, type ActionMenuItem } from '@/components/Atoms';
import { useRouter } from 'next/navigation';

export interface UserActionMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClick?: () => void;
  onClose?: () => void;
}

export const UserActionMenu = ({
  className,
  onClose,
  onClick,
  ...props
}: UserActionMenuProps) => {
  const router = useRouter();

  const menuItems: ActionMenuItem[] = [
    {
      id: 'mypage',
      label: '마이페이지',
      onClick: () => {
        router.push('/mypage');
      },
      variant: 'default',
    },
    {
      id: 'logout',
      label: '로그아웃',
      onClick: () => {
        onClick?.();
      },
      variant: 'default',
    },
  ];

  return (
    <ActionMenu
      items={menuItems}
      onClose={onClose}
      className={className}
      {...props}
    />
  );
};
