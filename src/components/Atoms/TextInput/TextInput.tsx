import { cn } from '@/utils/cn';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TextInput = ({
  placeholder,
  value,
  onChange,
  className,
  ...props
}: TextInputProps) => {
  return (
    <input
      className={cn(
        'bg-gray-5 flex w-full flex-1 items-center rounded-xl border-1 border-transparent px-4 py-2 font-medium text-[var(--GrayScale-Gray80)]',
        // interaction states
        'hover:ring-Green-20 hover:border-Green-20 hover:ring-1',
        'focus:ring-primary focus:border-primary focus:ring-1',
        'active:ring-primary active:border-primary active:ring-1',
        // disabled
        'disabled:hover:border-transparent disabled:hover:ring-0',
        'disabled:focus:border-transparent disabled:focus:ring-0',
        'disabled:active:border-transparent disabled:active:ring-0',
        'disabled:cursor-not-allowed',
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
