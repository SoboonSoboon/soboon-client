export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={`w-full rounded-xl bg-[var(--GrayScale-Gray5)] px-4 py-2.5 text-[var(--GrayScale-Gray90)] placeholder:top-0 placeholder:left-0 placeholder:text-left placeholder:text-[var(--GrayScale-Gray40)] focus:outline-none ${className || ''}`}
      {...props}
    />
  );
};
