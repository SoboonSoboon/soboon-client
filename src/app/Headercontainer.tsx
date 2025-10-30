'use client';

import { usePathname } from 'next/navigation';

export default function HeaderContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/');

  if (segments[2] === 'addinfo') {
    return null;
  }

  return <>{children}</>;
}
