import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'lg'],
    },
    isActive: {
      control: { type: 'boolean' },
    },
    onClick: {
      action: 'clicked',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[200px] items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: '전체',
    size: 'lg',
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    children: '냉장',
    size: 'lg',
    isActive: true,
  },
};

export const Small: Story = {
  args: {
    children: '신선',
    size: 'sm',
    isActive: false,
  },
};
