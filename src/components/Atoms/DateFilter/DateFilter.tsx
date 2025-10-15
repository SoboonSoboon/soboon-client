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
      className={`flex h-[40px] w-[110px] cursor-pointer items-center justify-between gap-1 rounded-xl border-2 border-[#F3F4F6] px-3 py-2 select-none ${className}`}
    >
      <div className="flex h-6 w-6 items-center gap-[1px]">
        <div>
          <ArrowUp
            width="16"
            height="18"
            className={`relative left-0.5 transition-all duration-200 ease-in-out ${
              optionValue === 'RECENT' ? 'text-[#9CA3AF]' : 'text-[#111827]'
            }`}
            strokeWidth="3"
          />
        </div>
        <div>
          <ArrowDown
            width="16"
            height="18"
            className={`relative right-0.5 transition-all duration-200 ease-in-out ${
              optionValue === 'OLDEST' ? 'text-[#9CA3AF]' : 'text-[#111827]'
            }`}
            strokeWidth="3"
          />
        </div>
      </div>
      <span className="text-sm font-medium text-[#1F2937]">작성일</span>
    </div>
  );
});

DateFilter.displayName = 'DateFilter';
