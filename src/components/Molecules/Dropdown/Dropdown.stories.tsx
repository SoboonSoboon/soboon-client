import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import React, { useState } from 'react';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filter', 'form'],
      description: '드롭다운 스타일 변형',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    required: {
      control: 'boolean',
      description: '필수 필드',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: '전체', label: '전체' },
  { value: '강남구', label: '강남구' },
  { value: '도봉구', label: '도봉구' },
  { value: '종로구', label: '종로구' },
  { value: '마포구', label: '마포구' },
  { value: '구로구', label: '구로구' },
  { value: '송파구', label: '송파구' },
  { value: '용산구', label: '용산구' },
];

const categoryOptions = [
  { value: 'sharing', label: '소분하기' },
  { value: 'shopping', label: '장보기' },
];

// Controls로 테스트 가능한 기본 스토리
export const Filter: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Dropdown {...args} value={value} onChange={setValue} />;
  },
  args: {
    variant: 'filter',
    options: sampleOptions,
    placeholder: '지역을 선택하세요',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Form: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Dropdown {...args} value={value} onChange={setValue} />;
  },
  args: {
    variant: 'form',
    options: categoryOptions,
    placeholder: '카테고리를 선택하세요',
  },
  parameters: {
    layout: 'centered',
  },
};

// 모든 상태를 한눈에 보는 스토리
export const AllStates: Story = {
  render: () => {
    const [filterValue, setFilterValue] = useState('');
    const [formValue, setFormValue] = useState('');
    const [requiredFormValue, setRequiredFormValue] = useState('');

    return (
      <div className="space-y-12">
        {/* Filter Variant */}
        <div>
          <h2 className="mb-6 text-xl font-bold">
            variant = &apos;filter&apos;
          </h2>
          <div className="flex gap-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">기본 상태</h3>
              <div className="flex flex-col gap-3">
                <Dropdown
                  variant="filter"
                  options={sampleOptions}
                  placeholder="지역을 선택하세요"
                  value={filterValue}
                  onChange={setFilterValue}
                  className="w-64"
                />
                <Dropdown
                  variant="filter"
                  options={sampleOptions}
                  placeholder="지역을 선택하세요"
                  disabled
                  className="w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Variant */}
        <div>
          <h2 className="mb-6 text-xl font-bold">variant = &apos;form&apos;</h2>
          <div className="flex gap-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">기본 상태</h3>
              <div className="flex flex-col gap-3">
                <Dropdown
                  variant="form"
                  options={categoryOptions}
                  placeholder="카테고리를 선택하세요"
                  value={formValue}
                  onChange={setFormValue}
                  className="w-64"
                />
                <Dropdown
                  variant="form"
                  options={categoryOptions}
                  placeholder="카테고리를 선택하세요"
                  disabled
                  className="w-64"
                />
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">필수 필드</h3>
              <div className="flex flex-col gap-3">
                <Dropdown
                  variant="form"
                  options={categoryOptions}
                  placeholder="카테고리를 선택하세요"
                  required
                  value={requiredFormValue}
                  onChange={setRequiredFormValue}
                  className="w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};
