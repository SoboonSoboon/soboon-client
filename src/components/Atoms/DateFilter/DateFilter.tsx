'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState, memo } from 'react';

export interface DateFilterProps {
  className?: string;
  onChange?: (value: 'RECENT' | 'OLDEST') => void;
}

export const DateFilter = memo(({ className, onChange }: DateFilterProps) => {
  const [optionValue, setOptionValue] = useState<'RECENT' | 'OLDEST'>('RECENT');

  const handleOptionChange = () => {
    setOptionValue((prev) => {
      const newValue = prev === 'RECENT' ? 'OLDEST' : 'RECENT';
      return newValue;
    });
    // 상태 업데이트 후 onChange 호출
    const newValue = optionValue === 'RECENT' ? 'OLDEST' : 'RECENT';
    onChange?.(newValue);
  };

  return (
    <div
      data-testid="date-filter-button"
      onClick={() => handleOptionChange()}
      className={`border-gray-10 flex h-10 cursor-pointer items-center justify-center gap-0.5 rounded-xl border p-1.5 select-none md:justify-between md:gap-1 md:px-3 md:py-2 ${className}`}
    >
      <div className="flex items-center gap-[1px]">
        <ArrowUp
          width="16"
          height="18"
          className={`relative left-0.5 transition-all duration-200 ease-in-out ${
            optionValue === 'RECENT' ? 'text-[#9CA3AF]' : 'text-[#111827]'
          }`}
          strokeWidth="3"
        />
        <ArrowDown
          width="16"
          height="18"
          className={`relative right-0.5 transition-all duration-200 ease-in-out ${
            optionValue === 'OLDEST' ? 'text-[#9CA3AF]' : 'text-[#111827]'
          }`}
          strokeWidth="3"
        />
      </div>
      <span className="hidden text-sm font-medium text-[#1F2937] md:block">
        작성일
      </span>
    </div>
  );
});

DateFilter.displayName = 'DateFilter';
