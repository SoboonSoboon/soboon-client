import Image from 'next/image';

interface ProfileImgProps {
  profile?: string;
  size?: number;
  className?: string;
}

export function ProfileImg({
  profile = '/images/profile_default.svg',
  size = 100,
  className,
}: ProfileImgProps) {
  return (
    <Image
      src={profile}
      alt="profileImage"
      className={`border-gray-10 rounded-full border-1 object-cover ${className || ''}`}
      width={size}
      height={size}
    />
  );
}
