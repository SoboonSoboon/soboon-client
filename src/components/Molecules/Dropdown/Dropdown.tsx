'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

export type DropdownVariant = 'filter' | 'form';

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
  variant?: DropdownVariant;
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
  variant = 'filter',
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
        className={cn(
          'flex w-full items-center justify-between gap-1.5 rounded-xl',
          variant === 'filter'
            ? 'border-gray-10 border bg-white px-3 py-2'
            : 'border-gray-5 bg-gray-5 px-4 py-2.5',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        )}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span
          className={cn(
            'whitespace-nowrap',
            selectedOption ? 'text-gray-95' : 'text-gray-40 font-medium',
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'text-gray-95 size-4 transition-transform duration-200',
            variant === 'filter' ? 'size-4' : 'size-5',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </button>

      {isOpen && options.length > 0 && (
        <div
          className={cn(
            'border-gray-20 absolute z-50 mt-1 max-h-60 w-fit min-w-full overflow-hidden rounded-xl border bg-white shadow-lg',
          )}
        >
          <div className="dropdown-scrollbar max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'w-full cursor-pointer text-left whitespace-nowrap focus:outline-none',
                  variant === 'filter'
                    ? 'px-4 py-2 hover:bg-[var(--GrayScale-Gray5)] focus:bg-[var(--GrayScale-Gray5)]'
                    : 'hover:bg-gray-5 focus:bg-gray-5 px-3 py-1.5',
                  value === option.value
                    ? 'bg-[var(--GreenScale-Green5)] text-[var(--GreenScale-Green50)]'
                    : 'text-gray-80',
                )}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
