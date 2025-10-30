import { cn } from '@/utils/cn';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        // base
        'bg-gray-5 w-full rounded-xl border-1 border-transparent px-4 py-2 text-[var(--GrayScale-Gray80)]',
        // placeholder
        'placeholder:text-left placeholder:text-[var(--GrayScale-Gray40)]',
        // interaction (match TextInput)
        'hover:ring-Green-20 hover:border-Green-20 hover:ring-1',
        'focus:ring-primary focus:border-primary focus:ring-1',
        'active:ring-primary active:border-primary active:ring-1',
        // disabled: remove interactive effects
        'disabled:hover:border-transparent disabled:hover:ring-0',
        'disabled:focus:border-transparent disabled:focus:ring-0',
        'disabled:active:border-transparent disabled:active:ring-0',
        'disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  );
};
