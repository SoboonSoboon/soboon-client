import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileImg } from './ProfileImg';

const meta: Meta<typeof ProfileImg> = {
  title: 'Atoms/ProfileImg',
  component: ProfileImg,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    profileImageUrl: {
      control: 'text',
      description: '프로필 이미지 경로',
    },
    size: {
      control: { type: 'number', min: 20, max: 300, step: 10 },
      description: '이미지 크기 (정사각형)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
    },
  },
};
export default meta;

type Story = StoryObj<typeof ProfileImg>;

export const Default: Story = {
  args: { size: 100 },
  parameters: {
    docs: {
      description: {
        story:
          '기본 프로필 이미지를 표시합니다. profile prop이 없으면 기본 이미지가 사용됩니다.',
      },
    },
  },
};

export const CustomImage: Story = {
  args: { size: 100, profileImageUrl: '/images/profile_default.svg' },
  parameters: {
    docs: {
      description: {
        story: '커스텀 프로필 이미지를 표시합니다.',
      },
    },
  },
};
