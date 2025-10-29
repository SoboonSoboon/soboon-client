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
            className="mb-4 rounded-lg border border-[#1A1A1A]"
          >
            <button
              className="flex w-full cursor-pointer items-center justify-between px-9 pt-8 pb-6 text-left"
              onClick={() => toggleItem(item.id)}
            >
              <span className="text-gray-95 text-2xl font-bold">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-gray-500 transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96' : 'max-h-0',
              )}
            >
              <div className="text-text-sub1 rounded-b-lg bg-[#f3f3f3] px-9 py-6 text-left font-normal whitespace-pre-line">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
