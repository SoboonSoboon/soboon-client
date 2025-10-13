import Image from 'next/image';

interface ProfileImgProps {
  profile: string;
  size?: number;
}

export function ProfileImg({ profile = '', size = 100 }: ProfileImgProps) {
  return (
    <Image
      src={profile}
      alt="profileImage"
      className="h-full w-full object-cover"
      width={size}
      height={size}
    />
  );
}
