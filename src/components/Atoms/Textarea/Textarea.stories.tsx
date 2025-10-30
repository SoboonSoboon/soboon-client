import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
    className: { control: 'text' },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '이름',
  },
};

export const WithValue: Story = {
  args: {
    value: '여기에 내용을 입력하세요',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화 상태',
    disabled: true,
    rows: 3,
  },
};
