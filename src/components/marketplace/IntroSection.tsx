import Image from 'next/image';
import { cn } from '@/utils/cn';

interface IntroSectionProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const IntroSection = ({
  src,
  alt,
  width,
  height,
  className,
}: IntroSectionProps) => {
  return (
    <div className={cn('border-gray-10 w-full rounded-lg border', className)}>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};
