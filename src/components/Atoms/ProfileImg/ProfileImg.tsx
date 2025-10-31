import Image from 'next/image';
import { cn } from '@/utils/cn';

interface ProfileImgProps {
  profileImageUrl?: string;
  size?: number;
  className?: string;
}

export function ProfileImg({
  profileImageUrl,
  size = 100,
  className,
}: ProfileImgProps) {
  const defaultProfileImage = '/images/profile_default.svg';
  return (
    <div
      className={cn(
        'border-gray-10 relative aspect-square overflow-hidden rounded-full border',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={profileImageUrl || defaultProfileImage}
        alt="profileImage"
        fill
        sizes="116px"
        className="object-cover"
      />
    </div>
  );
}
