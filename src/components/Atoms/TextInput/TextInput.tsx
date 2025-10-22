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
        'flex w-full flex-1 items-center rounded-xl border-2 border-transparent bg-[var(--GrayScale-Gray5)] px-4 py-2.5 text-[var(--GrayScale-Gray80)] focus:border-[var(--GreenScale-Green50)] focus:outline-none',
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
