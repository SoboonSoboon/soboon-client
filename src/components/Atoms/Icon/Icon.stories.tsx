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
        'dividing-cart',
        'dividing-cart-green',
        'shopping-basket',
        'shopping-basket-green',
        'soboon-letters',
        'soboon-logo',
      ],
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
  render: (args) => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold">기본 사용법</h2>
        <div className="flex items-center gap-4">
          <Icon {...args} />
          <span>type(shopping-basket)을 아이콘 컴포넌트에 주입</span>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">다양한 크기</h2>
        <div className="flex items-center gap-4">
          <Icon type="soboon-logo" size={16} />
          <Icon type="soboon-logo" size={24} />
          <Icon type="soboon-logo" size={32} />
          <Icon type="soboon-logo" size={48} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">코드 예시</h2>
        <div className="rounded-lg bg-gray-100 p-4">
          <pre className="text-sm">
            {`<Icon type="shopping-basket" size={24} />`}
          </pre>
        </div>
      </div>
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 p-4">
        <Icon type="dividing-cart" size={32} />
        <div className="text-center">
          <div className="mt-1 text-xs text-gray-500">dividing-cart</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 p-4">
        <Icon type="dividing-cart-green" size={32} />
        <div className="text-center">
          <div className="mt-1 text-xs text-gray-500">dividing-cart-green</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 p-4">
        <Icon type="shopping-basket" size={32} />
        <div className="text-center">
          <div className="mt-1 text-xs text-gray-500">shopping-basket</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 p-4">
        <Icon type="shopping-basket-green" size={32} />
        <div className="text-center">
          <div className="mt-1 text-xs text-gray-500">
            shopping-basket-green
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 p-4">
        <Icon type="soboon-letters" size={32} />
        <div className="text-center">
          <div className="mt-1 text-xs text-gray-500">soboon-letters</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 p-4">
        <Icon type="soboon-logo" size={32} />
        <div className="text-center">
          <div className="mt-1 text-xs text-gray-500">soboon-logo</div>
        </div>
      </div>
    </div>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold">기본 사용법</h2>
        <div className="flex items-center gap-4">
          <Icon type="shopping-basket" size={24} />
          <span>type(shopping-basket)을 아이콘 컴포넌트에 주입</span>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">다양한 크기</h2>
        <div className="flex items-center gap-4">
          <Icon type="soboon-logo" size={16} />
          <Icon type="soboon-logo" size={24} />
          <Icon type="soboon-logo" size={32} />
          <Icon type="soboon-logo" size={48} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">코드 예시</h2>
        <div className="rounded-lg bg-gray-100 p-4">
          <pre className="text-sm">
            {`<Icon type="shopping-basket" size={24} />`}
          </pre>
        </div>
      </div>
    </div>
  ),
};
