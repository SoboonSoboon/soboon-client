import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import React from 'react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    label: {
      control: 'text',
      description: '버튼 텍스트',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '버튼 타입',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Controls로 테스트 가능한 기본 스토리
export const Filled: Story = {
  args: {
    variant: 'filled',
    size: 'large',
    label: '버튼',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'large',
    label: '버튼',
  },
  parameters: {
    layout: 'centered',
  },
};

// 모든 상태를 한눈에 보는 스토리
export const AllStates: Story = {
  render: () => (
    <div className="space-y-12">
      {/* Filled Variant */}
      <div>
        <h2 className="mb-6 text-xl font-bold">Filled Variant</h2>
        <div className="flex gap-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              PC 사이즈 (Large - 332px)
            </h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="filled"
                size="large"
                label="기본 상태"
                className="w-[332px]"
              />
              <Button
                variant="filled"
                size="large"
                label="Hover"
                className="w-[332px] bg-[var(--GreenScale-Green60)]"
              />
              <Button
                variant="filled"
                size="large"
                label="Active"
                className="w-[332px] bg-[var(--GreenScale-Green70)]"
              />
              <Button
                variant="filled"
                size="large"
                label="Disabled"
                className="w-[332px]"
                disabled
              />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              모바일 사이즈 (Small - 120px)
            </h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="filled"
                size="small"
                label="기본 상태"
                className="w-[120px]"
              />
              <Button
                variant="filled"
                size="small"
                label="Hover"
                className="w-[120px] bg-[var(--GreenScale-Green60)]"
              />
              <Button
                variant="filled"
                size="small"
                label="Active"
                className="w-[120px] bg-[var(--GreenScale-Green70)]"
              />
              <Button
                variant="filled"
                size="small"
                label="Disabled"
                className="w-[120px]"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* Outline Variant */}
      <div>
        <h2 className="mb-6 text-xl font-bold">Outline Variant</h2>
        <div className="flex gap-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              PC 사이즈 (Large - 332px)
            </h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                size="large"
                label="기본 상태"
                className="w-[332px]"
              />
              <Button
                variant="outline"
                size="large"
                label="Hover"
                className="w-[332px] border-[var(--GreenScale-Green60)] text-[var(--GreenScale-Green60)]"
              />
              <Button
                variant="outline"
                size="large"
                label="Active"
                className="w-[332px] border-[var(--GreenScale-Green70)] text-[var(--GreenScale-Green70)]"
              />
              <Button
                variant="outline"
                size="large"
                label="Disabled"
                className="w-[332px]"
                disabled
              />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              모바일 사이즈 (Small - 120px)
            </h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                size="small"
                label="기본 상태"
                className="w-[120px]"
              />
              <Button
                variant="outline"
                size="small"
                label="Hover"
                className="w-[120px] border-[var(--GreenScale-Green60)] text-[var(--GreenScale-Green60)]"
              />
              <Button
                variant="outline"
                size="small"
                label="Active"
                className="w-[120px] border-[var(--GreenScale-Green70)] text-[var(--GreenScale-Green70)]"
              />
              <Button
                variant="outline"
                size="small"
                label="Disabled"
                className="w-[120px]"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
