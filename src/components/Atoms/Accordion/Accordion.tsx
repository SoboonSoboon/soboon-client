'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

export const Accordion = ({
  items,
  className,
  allowMultiple = false,
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId];
      } else {
        return prev.includes(itemId) ? [] : [itemId];
      }
    });
  };

  return (
    <div className={cn('w-full', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div
            key={item.id}
            className="mb-3 rounded-lg border border-[#1A1A1A] sm:mb-4"
          >
            <button
              className="flex w-full cursor-pointer items-center justify-between px-4 py-4 text-left sm:px-6 sm:py-5 md:px-9 md:pt-6 md:pb-5.5"
              onClick={() => toggleItem(item.id)}
            >
              <span className="text-gray-95 text-lg leading-tight font-bold sm:text-xl md:text-2xl">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  'flex-shrink-0 transition-transform duration-200 sm:hidden',
                  isOpen && 'rotate-180',
                )}
                size={24}
              />
              <ChevronDown
                className={cn(
                  'hidden flex-shrink-0 transition-transform duration-200 sm:block md:hidden',
                  isOpen && 'rotate-180',
                )}
                size={28}
              />
              <ChevronDown
                className={cn(
                  'hidden flex-shrink-0 transition-transform duration-200 md:block',
                  isOpen && 'rotate-180',
                )}
                size={30}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 sm:max-h-80 md:max-h-96' : 'max-h-0',
              )}
            >
              <div className="text-text-sub1 rounded-b-lg bg-[#d9d9d9] px-4 py-4 text-left text-sm leading-relaxed font-normal whitespace-pre-line sm:px-6 sm:py-5 sm:text-base md:px-9 md:py-6">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
