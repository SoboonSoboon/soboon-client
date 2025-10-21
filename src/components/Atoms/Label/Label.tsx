export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export const Label = ({ children, required = false, ...props }: LabelProps) => {
  return (
    <label className="text-[16px] text-[var(--GrayScale-Gray80)]" {...props}>
      {children} {required && <span className="text-primary"> *</span>}
    </label>
  );
};
