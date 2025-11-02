import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label, Checkbox } from '@/components/Atoms';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    required: false,
    disabled: false,
    className: '',
    id: 'checkbox',
    name: 'checkbox',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            {...args}
            id="checkbox"
            name="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <Label htmlFor="checkbox" className="cursor-pointer">
            체크박스
          </Label>
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);

    return (
      <div className="flex flex-col gap-6 p-4">
        <div>
          <h3 className="mb-3 text-lg font-semibold">다양한 체크박스 상태</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="unchecked"
                name="unchecked"
                checked={checked1}
                onChange={() => setChecked1(!checked1)}
              />
              <Label htmlFor="unchecked" className="cursor-pointer">
                체크 안됨
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="checked"
                name="checked"
                checked={checked2}
                onChange={() => setChecked2(!checked2)}
              />
              <Label htmlFor="checked" className="cursor-pointer">
                체크됨
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="disabled-unchecked"
                name="disabled-unchecked"
                checked={false}
                disabled={true}
              />
              <Label htmlFor="disabled-unchecked" className="opacity-50">
                비활성화 (체크 안됨)
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="disabled-checked"
                name="disabled-checked"
                checked={true}
                disabled={true}
              />
              <Label htmlFor="disabled-checked" className="opacity-50">
                비활성화 (체크됨)
              </Label>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
