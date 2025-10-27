import { cn } from '@/utils/cn';
import { Icon } from '@/components/Atoms';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 75, height = 28 }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-1 p-1', className)}>
      <Icon type="soboon-letters" size={width} alt="Soboon Letters" />
      <Icon type="soboon-logo" size={height} alt="Soboon Logo" />
    </div>
  );
}
