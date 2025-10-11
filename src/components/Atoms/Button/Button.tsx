export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-block cursor-pointer border-1 rounded-[8px] leading-none';

  // Primary/Secondary styles
  const modeStyles = primary
    ? 'bg-black dark:bg-white text-white dark:text-black'
    : 'shadow-[rgba(0,0,0,0.15)_0px_0px_0px_1px_inset] bg-transparent text-[#333]';

  // Size styles
  const sizeStyles = {
    small: 'px-4 py-2.5 text-base',
    medium: 'px-5 py-[11px] text-base',
    large: 'px-6 py-3 text-base',
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${modeStyles} ${sizeStyles[size]} ${className}`}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {label}
    </button>
  );
};
