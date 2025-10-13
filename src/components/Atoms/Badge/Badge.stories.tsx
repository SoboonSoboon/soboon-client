import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: '표시할 숫자',
    },
    max: {
      control: 'number',
      description: '최대값. 이 값을 초과하면 "max+" 형태로 표시됩니다.',
    },
    showZero: {
      control: 'boolean',
      description: 'count가 0일 때 배지를 표시할지 여부',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    count: 5,
  },
};

export const ShowZero: Story = {
  args: {
    count: 0,
    showZero: true,
  },
};

export const MaxExceeded: Story = {
  args: {
    count: 1000,
    max: 999,
  },
};

export const CustomMax: Story = {
  args: {
    count: 150,
    max: 99,
  },
};
