import Image from 'next/image';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 75, height = 28 }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-1 p-1', className)}>
      <Image
        src="/icons/soboon_letters.svg"
        alt="Soboon Letters"
        width={width}
        height={height}
      />
      <Image
        src="/icons/soboon_logo.svg"
        alt="Soboon Logo"
        width={height}
        height={height}
      />
    </div>
  );
}
