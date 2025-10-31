import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex w-auto items-center gap-1 p-1">
      <Image
        src="/icons/soboon_letters.svg"
        width={80}
        height={23}
        alt="Soboon Letters"
        className="h-[22px] w-[70px] sm:h-[23px] sm:w-[80px]"
      />
      <Image
        src="/icons/soboon_logo.svg"
        width={23}
        height={23}
        alt="Soboon Logo"
        className="h-[17px] w-[17px] sm:h-[23px] sm:w-[23px]"
      />
    </div>
  );
}
