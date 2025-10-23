import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

interface FilterSelectProps {
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  className?: string;
}

export const FilterSelect = ({
  name,
  value,
  options,
  onChange,
  className,
}: FilterSelectProps) => {
  console.log(options);
  return (
    <div className="relative">
      <select
        name={name}
        id={name}
        className={cn(
          'min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none',
          className,
        )}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDown className="size-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
      </div>
    </div>
  );
};
