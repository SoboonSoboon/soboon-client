import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { CreateButton } from './CreateButton';

const meta = {
  title: 'Atoms/CreateButton',
  component: CreateButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    actionHandlers: {
      description: '메뉴 아이템 클릭 핸들러',
      control: false,
    },
  },
} satisfies Meta<typeof CreateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actionHandlers: {
      shopping: fn(),
      dividing: fn(),
    },
  },
};
