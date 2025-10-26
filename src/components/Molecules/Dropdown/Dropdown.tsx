'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string | number;
  label: string;
}

export type DropdownVariant = 'filter' | 'form' | 'gray';

export interface DropdownProps {
  name?: string;
  id?: string;
  options: DropdownOption[];
  placeholder?: string;
  value?: string | number;
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
    onChange?.(option.value.toString());
    setIsOpen(false);
  };

  const buttonStyles = {
    filter: 'border-gray-10 border bg-white px-3 py-2',
    form: 'border-gray-5 bg-gray-5 border px-4 py-2.5',
    gray: 'bg-gray-5 border-0 px-4 py-2.5',
  };

  const dropdownStyles = {
    filter: 'border-gray-20 border bg-white',
    form: 'border-gray-20 border bg-white',
    gray: 'bg-gray-5 border-0',
  };

  const itemStyles = {
    filter: 'px-4 py-2 hover:bg-gray-5  focus:bg-gray-5',
    form: 'hover:bg-gray-5 focus:bg-gray-5 px-3 py-1.5',
    gray: 'hover:bg-Green-10 focus:bg-Green-10 px-3 py-1.5',
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
          buttonStyles[variant],
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
            'absolute z-50 mt-1 max-h-60 w-fit min-w-full overflow-hidden rounded-xl shadow-lg',
            dropdownStyles[variant],
          )}
        >
          <div className="dropdown-scrollbar max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'w-full cursor-pointer text-left whitespace-nowrap focus:outline-none',
                  itemStyles[variant],
                  value === option.value
                    ? 'bg-Green-5 text-Green-50'
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
