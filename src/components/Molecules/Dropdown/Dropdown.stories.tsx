import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Dropdown, type DropdownProps } from './Dropdown';

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<InteractiveDropdownProps>;

const sampleOptions = [
  { value: 'gangnam', label: '강남구' },
  { value: 'dobong', label: '도봉구' },
  { value: 'jongno', label: '종로구' },
  { value: 'mapo', label: '마포구' },
  { value: 'guro', label: '구로구' },
  { value: 'songpa', label: '송파구' },
  { value: 'yongsan', label: '용산구' },
  { value: 'seodaemun', label: '서대문구' },
  { value: 'gangseo', label: '강서구' },
  { value: 'nowon', label: '노원구' },
];

interface InteractiveDropdownProps
  extends Omit<DropdownProps, 'value' | 'onChange'> {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const InteractiveDropdown = ({
  initialValue,
  onChange,
  ...props
}: InteractiveDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || '');

  return (
    <Dropdown
      {...props}
      value={selectedValue}
      onChange={(value) => {
        setSelectedValue(value);
        onChange?.(value);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    options: sampleOptions,
    placeholder: '지역구',
  },
};

export const WithValue: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    options: sampleOptions,
    placeholder: '지역구',
    initialValue: 'gangnam',
  },
};
