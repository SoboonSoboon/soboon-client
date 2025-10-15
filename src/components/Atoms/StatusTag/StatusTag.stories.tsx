import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusTag } from './StatusTag';

const meta = {
  title: 'Atoms/StatusTag',
  component: StatusTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['RECRUITING', 'COMPLETED', 'CLOSED'],
      description: '상태 타입',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof StatusTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recruiting: Story = {
  args: {
    status: 'RECRUITING',
  },
};

export const Completed: Story = {
  args: {
    status: 'COMPLETED',
  },
};

export const Closed: Story = {
  args: {
    status: 'CLOSED',
  },
};
