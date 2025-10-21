'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  name?: string;
  id?: string;
  options: DropdownOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const Dropdown = ({
  name,
  id,
  options,
  placeholder = '선택하세요',
  value,
  onChange,
  disabled = false,
  required = false,
  className,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: DropdownOption) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={cn('relative w-full', className)}
      ref={dropdownRef}
      {...props}
    >
      <button
        type="button"
        name={name}
        id={id}
        className={`flex w-full items-center justify-between gap-2.5 rounded-xl border-2 border-transparent bg-[var(--GrayScale-Gray5)] px-4 py-2.5 text-[var(--GrayScale-Gray40)] focus:outline-none ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } ${isOpen ? 'border-[var(--GreenScale-Green50)]' : ''} `}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span
          className={` ${
            selectedOption ? 'text-[var(--GrayScale-Gray80)]' : placeholder
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`size-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && options.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-[var(--GrayScale-Gray20)] bg-[var(--GrayScale-White)] shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full cursor-pointer px-4 py-2 text-left first:rounded-t-xl last:rounded-b-xl hover:bg-[var(--GrayScale-Gray5)] focus:bg-[var(--GrayScale-Gray5)] focus:outline-none ${
                value === option.value
                  ? 'bg-[var(--GreenScale-Green5)] text-[var(--GreenScale-Green50)]'
                  : 'text-[var(--GrayScale-Gray80)]'
              } `}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
