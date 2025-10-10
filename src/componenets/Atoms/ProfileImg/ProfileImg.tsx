import Image from 'next/image';

export function ProfileImg({ profile = '' }: { profile: string }) {
  return (
    <Image
      src={profile}
      alt="profileImage"
      className="h-full w-full object-cover"
      width={100}
      height={100}
    />
  );
}
