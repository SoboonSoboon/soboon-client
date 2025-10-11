export interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = ({
  placeholder,
  value,
  onChange,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      className="flex py-2.5 px-4 rounded-xl bg-[var(--GrayScale-Gray5)] text-[var(--GrayScale-Gray40)] w-100 h-50 focus:outline-none focus:text-[var(--GrayScale-Gray8)] placeholder:text-left placeholder:top-0 placeholder:left-0"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
