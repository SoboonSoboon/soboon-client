import Image from 'next/image';
import { cn } from '@/utils/cn';

interface BannerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Banner = ({ src, alt, width, height, className }: BannerProps) => {
  return (
    <div className={cn('border-gray-10 w-full rounded-lg border', className)}>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};
