import Image from 'next/image';
import { cn } from '@/utils/cn';

export type IconType =
  | 'sharing-cart'
  | 'sharing-cart-green'
  | 'shopping-basket'
  | 'shopping-basket-green'
  | 'soboon-letters'
  | 'soboon-logo';

interface IconProps {
  type: IconType;
  size: number;
  className?: string;
  alt?: string;
}

const ICON_PATHS: Record<IconType, string> = {
  'sharing-cart': '/icons/sharing_cart.svg',
  'sharing-cart-green': '/icons/sharing_cart_green.svg',
  'shopping-basket': '/icons/shopping_basket.svg',
  'shopping-basket-green': '/icons/shopping_basket_green.svg',
  'soboon-letters': '/icons/soboon_letters.svg',
  'soboon-logo': '/icons/soboon_logo.svg',
};

export function Icon({ type, size = 20, className, alt }: IconProps) {
  const iconPath = ICON_PATHS[type];
  const defaultAlt = alt || `${type} icon`;

  return (
    <Image
      src={iconPath}
      alt={defaultAlt}
      width={size}
      height={size}
      className={cn('object-contain', className)}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        objectPosition: 'center',
        display: 'inline-block',
      }}
    />
  );
}
