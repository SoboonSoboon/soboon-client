import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Atoms/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '입력 필드의 placeholder 텍스트',
    },
    value: {
      control: 'text',
      description: '입력 필드의 값',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input 타입',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithValue: Story = {
  args: {
    value: '입력된 텍스트',
    placeholder: '텍스트를 입력하세요',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 입력 필드',
    disabled: true,
  },
};
