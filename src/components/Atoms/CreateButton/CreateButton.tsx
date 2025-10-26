'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';

const CREATE_MENU_OPTIONS = {
  shopping: { label: '장보기', icon: '/icons/shopping_basket.svg' },
  sharing: { label: '소분하기', icon: '/icons/sharing_cart.svg' },
} as const;

type CreateMenuKey = keyof typeof CREATE_MENU_OPTIONS;

type CreateButtonProps = {
  actionHandlers: {
    shopping: () => void;
    sharing: () => void;
  };
};

export const CreateButton = ({ actionHandlers }: CreateButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleAction = (key: CreateMenuKey) => {
    actionHandlers[key]?.();
  };

  return (
    <div className="flex cursor-pointer flex-col items-center gap-1.5">
      <div
        className={`flex flex-col gap-2.5 transition-all duration-300 ease-in-out ${
          open
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-hidden={!open}
      >
        {(
          Object.entries(CREATE_MENU_OPTIONS) as [
            CreateMenuKey,
            (typeof CREATE_MENU_OPTIONS)[CreateMenuKey],
          ][]
        ).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => handleAction(key)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border-1 border-[var(--GrayScale-Gray50)] bg-white drop-shadow-[0_0_4px_var(--Gray-Scale-Gray-20,#C8C8C8)]"
              aria-label={`${value.label} 만들기`}
            >
              <Image
                src={value.icon}
                alt={value.label}
                width={24}
                height={24}
                aria-hidden
              />
            </button>
            <span className="font-memomentKkukkkuk text-[var(--GrayScale-Gray70)]">
              {value.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex px-3 py-1">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`border-primary bg-primary flex size-11 cursor-pointer items-center justify-center rounded-full border-1 shadow-[0_0_0.25rem_0_var(--GreenScale-Green20)] transition-all duration-300 ease-out ${open ? 'scale-105 shadow-[0_0_0.5rem_0_var(--GreenScale-Green20)]' : 'scale-100'}`}
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
        >
          <Plus
            className={`text-white transition-all duration-300 ease-out ${open ? 'scale-110 rotate-45' : 'scale-100 rotate-0'}`}
          />
        </button>
      </div>
    </div>
  );
};

CreateButton.displayName = 'CreateButton';
