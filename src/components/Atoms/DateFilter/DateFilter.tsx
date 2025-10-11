import { useState, useCallback, memo } from 'react';

export interface DateFilterProps {
  className?: string;
  onChange?: (value: 'desc' | 'asc') => void;
}

export const DateFilter = memo(({ className, onChange }: DateFilterProps) => {
  const [optionValue, setOptionValue] = useState<'desc' | 'asc'>('desc');

  const handleOptionChange = useCallback(() => {
    setOptionValue((prev) => {
      const newValue = prev === 'desc' ? 'asc' : 'desc';
      onChange?.(newValue);
      return newValue;
    });
  }, [onChange]);

  return (
    <div
      onClick={() => handleOptionChange()}
      className={`flex h-[40px] w-[110px] cursor-pointer items-center justify-between gap-1 rounded-xl border-2 border-[#F3F4F6] px-3 py-2 select-none ${className}`}
    >
      <div className="flex h-6 w-6 items-center gap-[1px]">
        <div>
          <svg
            width="10"
            height="13"
            viewBox="0 0 10 13"
            fill="none"
            className={`transition-all duration-200 ease-in-out ${
              optionValue === 'desc' ? 'text-[#9CA3AF]' : 'text-[#111827]'
            }`}
          >
            <path
              d="M1 6L5 2M5 2L9 6M5 2V12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div>
            <svg
              width="10"
              height="13"
              viewBox="0 0 10 13"
              fill="none"
              className={`transition-all duration-200 ease-in-out ${
                optionValue === 'asc' ? 'text-[#9CA3AF]' : 'text-[#111827]'
              }`}
            >
              <path
                d="M1 7L5 11M5 11L9 7M5 11V1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <span className="text-sm font-medium text-[#1F2937]">작성일</span>
    </div>
  );
});

DateFilter.displayName = 'DateFilter';
