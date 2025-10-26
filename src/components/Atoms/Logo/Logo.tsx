import Image from 'next/image';
import { cn } from '@/utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-1 p-1', className)}>
      <Image
        src="/icons/soboon_letters.svg"
        alt="Soboon Letters"
        width={75}
        height={28}
      />
      <Image
        src="/icons/soboon_logo.svg"
        alt="Soboon Logo"
        width={28}
        height={28}
      />
    </div>
  );
}
