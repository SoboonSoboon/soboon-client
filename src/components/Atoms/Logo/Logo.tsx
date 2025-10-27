import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex w-auto items-center gap-1 p-1">
      <Image
        src="/icons/soboon_letters.svg"
        width={80}
        height={23}
        alt="Soboon Letters"
      />
      <Image
        src="/icons/soboon_logo.svg"
        width={23}
        height={23}
        alt="Soboon Logo"
      />
    </div>
  );
}
