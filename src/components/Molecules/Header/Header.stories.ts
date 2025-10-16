import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Header } from './Header';

const meta = {
  title: 'Molecules/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    // onLogout: fn(),
    onCreateGather: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: '너 구리',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpiJxZHaa1esOxgoZRV9XEIiGrMXF1p3mfAw&s',
    },
  },
};

export const LoggedOut: Story = {};
