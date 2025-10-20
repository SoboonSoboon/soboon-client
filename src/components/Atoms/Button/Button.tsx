import { cn } from '@/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'block';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  variant,
  size = 'medium',
  backgroundColor,
  label,
  className,
  onClick,
  ...props
}: ButtonProps) => {
  const isBlocked = variant === 'block';
  // variant가 없으면 기존 primary prop 사용 (mvp 끝나고 나서 common리팩토링)
  const buttonVariant = variant || (primary ? 'primary' : 'secondary');

  const baseStyles = 'inline-block  rounded-[8px] border leading-none';

  const variantStyles = {
    primary: 'bg-primary min-w-[115px] text-white cursor-pointer',
    secondary:
      'bg-transparent text-[#333] shadow-[rgba(0,0,0,0.15)_0px_0px_0px_1px_inset] cursor-pointer',
    outline:
      'text-primary border-primary bg-white hover:bg-primary hover:text-white cursor-pointer',
    block: 'bg-gray-40 text-gray-80 border-none ',
  };

  const sizeStyles = {
    small: 'px-4 py-2.5 text-base',
    medium: 'px-5 py-[11px] text-base',
    large: 'px-6 py-3 text-base',
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isBlocked) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    onClick?.();
  };
  return (
    <button
      type="button"
      className={cn(
        baseStyles,
        variantStyles[buttonVariant],
        sizeStyles[size],
        className,
      )}
      style={backgroundColor ? { backgroundColor } : undefined}
      onClick={handleClick}
      {...props}
    >
      {label}
    </button>
  );
};

//cn clsx 사용해야될듯
