export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export const Label = ({ children, required, ...props }: LabelProps) => {
  return (
    <label className="text-[16px] text-[var(--GrayScale-Gray80)]" {...props}>
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};
