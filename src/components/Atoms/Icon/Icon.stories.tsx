import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'sharing-cart',
        'sharing-cart-green',
        'shopping-basket',
        'shopping-basket-green',
        'soboon-letters',
        'soboon-logo',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'shopping-basket',
    size: 20,
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col items-center gap-2">
        <Icon type="sharing-cart" size={24} />
        <span className="text-sm">Sharing Cart</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="sharing-cart-green" size={24} />
        <span className="text-sm">Sharing Cart Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="shopping-basket" size={24} />
        <span className="text-sm">Shopping Basket</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="shopping-basket-green" size={24} />
        <span className="text-sm">Shopping Basket Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="soboon-letters" size={24} />
        <span className="text-sm">Soboon Letters</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="soboon-logo" size={24} />
        <span className="text-sm">Soboon Logo</span>
      </div>
    </div>
  ),
};
