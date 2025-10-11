export interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  placeholder,
  value,
  onChange,
  ...props
}: TextInputProps) => {
  return (
    <input
      className="flex items-center flex-1 gap-2.5 border-2 border-transparent rounded-xl py-2.5 px-4 bg-[var(--GrayScale-Gray5)] text-[var(--GrayScale-Gray80)] focus:border-[var(--OrangeScale-Orange50)] focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
